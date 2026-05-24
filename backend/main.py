from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# フロント接続許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 動作確認
@app.get("/")
def root():
    return {
        "message": "Backend 起動成功！"
    }

# 要約テスト
@app.get("/summary")
def summary():
    return {
        "summary": "これはAI要約テストです"
    }

# ファイルアップロード
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    return {
        "filename": file.filename
    }