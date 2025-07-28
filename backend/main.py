from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine, Item as DBItem, Base
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        allow_mutation = True

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.get("/api/items", response_model=List[Item])
def get_items(db: Session = Depends(get_db)):
    return db.query(DBItem).all()

@app.get("/api/items/{id}", response_model=Item)
def get_item(id: int, db: Session = Depends(get_db)):
    item = db.query(DBItem).filter(DBItem.id == id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.post("/api/items", response_model=Item)
def create_item(item: Item, db: Session = Depends(get_db)):
    db_item = DBItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.put("/api/items/{id}", response_model=Item)
def update_item(id: int, updated_item: Item, db: Session = Depends(get_db)):
    item = db.query(DBItem).filter(DBItem.id == id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    update_data = updated_item.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(item, key, value)
    setattr(item, 'updated_at', datetime.now())
    db.commit()
    db.refresh(item)
    return item

@app.delete("/api/items/{id}")
def delete_item(id: int, db: Session = Depends(get_db)):
    item = db.query(DBItem).filter(DBItem.id == id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "Item deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
