from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import sqlite3
from pathlib import Path
from urllib.parse import urlparse


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "agrosense.db"
HOST = "localhost"
PORT = 8000

METADADOS = {
    "drone": "Drone Alpha-01",
    "talhao": "Talhao Experimental 03",
    "cultura": "Soja",
    "tensaoBateria": 14.8,
    "correnteMedia": 7.4,
    "faixaAplicacao": 7,
    "vazaoPadrao": 1.4,
}

LEITURAS_INICIAIS = [
    (0, 0, 0.73, 42, 96),
    (2, 4.6, 0.71, 41, 93),
    (4, 5.1, 0.68, 39, 89),
    (6, 4.8, 0.62, 37, 84),
    (8, 5.5, 0.58, 35, 78),
    (10, 5.0, 0.64, 38, 72),
]


def conectar():
    conexao = sqlite3.connect(DB_PATH)
    conexao.row_factory = sqlite3.Row
    return conexao


def inicializar_banco():
    with conectar() as conexao:
        conexao.execute(
            """
            CREATE TABLE IF NOT EXISTS leituras (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                minuto INTEGER NOT NULL,
                velocidade REAL NOT NULL,
                ndvi REAL NOT NULL,
                umidade REAL NOT NULL,
                bateria REAL NOT NULL,
                criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        total = conexao.execute("SELECT COUNT(*) AS total FROM leituras").fetchone()["total"]
        if total == 0:
            conexao.executemany(
                """
                INSERT INTO leituras (minuto, velocidade, ndvi, umidade, bateria)
                VALUES (?, ?, ?, ?, ?)
                """,
                LEITURAS_INICIAIS,
            )


def listar_leituras():
    with conectar() as conexao:
        linhas = conexao.execute(
            """
            SELECT minuto, velocidade, ndvi, umidade, bateria
            FROM leituras
            ORDER BY minuto ASC, id ASC
            """
        ).fetchall()

    return [dict(linha) for linha in linhas]


def proximo_minuto():
    with conectar() as conexao:
        linha = conexao.execute("SELECT MAX(minuto) AS minuto FROM leituras").fetchone()
    return int(linha["minuto"] or 0) + 2


def inserir_leitura(dados):
    minuto = int(dados.get("minuto") or proximo_minuto())
    velocidade = float(dados["velocidade"])
    ndvi = float(dados["ndvi"])
    umidade = float(dados["umidade"])
    bateria = float(dados["bateria"])

    if not 0 <= ndvi <= 1:
        raise ValueError("NDVI deve estar entre 0 e 1.")
    if not 0 <= umidade <= 100:
        raise ValueError("Umidade deve estar entre 0 e 100.")
    if not 0 <= bateria <= 100:
        raise ValueError("Bateria deve estar entre 0 e 100.")
    if velocidade < 0:
        raise ValueError("Velocidade nao pode ser negativa.")

    with conectar() as conexao:
        conexao.execute(
            """
            INSERT INTO leituras (minuto, velocidade, ndvi, umidade, bateria)
            VALUES (?, ?, ?, ?, ?)
            """,
            (minuto, velocidade, ndvi, umidade, bateria),
        )


def restaurar_leituras():
    with conectar() as conexao:
        conexao.execute("DELETE FROM leituras")
        conexao.executemany(
            """
            INSERT INTO leituras (minuto, velocidade, ndvi, umidade, bateria)
            VALUES (?, ?, ?, ?, ?)
            """,
            LEITURAS_INICIAIS,
        )


def resposta_payload():
    return {**METADADOS, "leituras": listar_leituras()}


class AgroSenseHandler(BaseHTTPRequestHandler):
    def _enviar_json(self, status, payload):
        corpo = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Length", str(len(corpo)))
        self.end_headers()
        self.wfile.write(corpo)

    def _rota_valida(self):
        return urlparse(self.path).path == "/api/agrosense/telemetria"

    def do_OPTIONS(self):
        self._enviar_json(200, {"ok": True})

    def do_GET(self):
        if not self._rota_valida():
            self._enviar_json(404, {"erro": "Rota nao encontrada."})
            return

        self._enviar_json(200, resposta_payload())

    def do_POST(self):
        if not self._rota_valida():
            self._enviar_json(404, {"erro": "Rota nao encontrada."})
            return

        try:
            tamanho = int(self.headers.get("Content-Length", 0))
            dados = json.loads(self.rfile.read(tamanho) or b"{}")
            inserir_leitura(dados)
            self._enviar_json(201, resposta_payload())
        except (KeyError, ValueError, json.JSONDecodeError) as erro:
            self._enviar_json(400, {"erro": str(erro)})

    def do_DELETE(self):
        if not self._rota_valida():
            self._enviar_json(404, {"erro": "Rota nao encontrada."})
            return

        restaurar_leituras()
        self._enviar_json(200, resposta_payload())

    def log_message(self, formato, *args):
        print(f"[AgroSense API] {self.address_string()} - {formato % args}")


if __name__ == "__main__":
    inicializar_banco()
    servidor = ThreadingHTTPServer((HOST, PORT), AgroSenseHandler)
    print(f"API AgroSense rodando em http://{HOST}:{PORT}/api/agrosense/telemetria")
    servidor.serve_forever()
