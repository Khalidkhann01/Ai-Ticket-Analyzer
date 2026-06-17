from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from database import engine, Base, SessionLocal
from models import Ticket
from ai_engine import analyze_ticket
from datetime import datetime
import requests
import json

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Ticket Analyzer",
    description="AI system for ticket classification and automation",
    version="1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# ROOT ENDPOINT
# ---------------------------
@app.get("/")
def home():
    return {
        "message": "AI Ticket Analyzer is running",
        "status": "online"
    }

# ---------------------------
# SUBMIT TICKET (Frontend calls this)
# ---------------------------
@app.post("/ticket")
def receive_ticket(data: dict):
    try:
        message = data.get("message")
        customer_name = data.get("customer_name", "")
        customer_email = data.get("customer_email", "")
        customer_phone = data.get("customer_phone", "")

        if not message:
            return {"error": "No message provided"}

        # AI processing
        category, priority, response = analyze_ticket(message)

        # Save to DB
        db = SessionLocal()
        ticket = Ticket(
            customer_name=customer_name,
            customer_email=customer_email,
            customer_phone=customer_phone,
            message=message,
            category=category,
            priority=priority,
            response=response
        )
        db.add(ticket)
        db.commit()
        db.refresh(ticket)
        db.close()

        # Forward to n8n cloud webhook (TEST URL)
        n8n_success = False
        n8n_error = None
        
        try:
            # Using webhook-test URL for testing
            n8n_response = requests.post(
                "https://mykhann.app.n8n.cloud/webhook-test/ticket-ai",  # TEST webhook URL
                json={
                    "message": message,
                    "customer_name": customer_name,
                    "customer_email": customer_email,
                    "customer_phone": customer_phone,
                    "category": category,
                    "priority": priority,
                    "response": response
                },
                timeout=10
            )
            
            if n8n_response.status_code == 200:
                n8n_success = True
                print(f"✅ Forwarded to n8n successfully")
                print(f"   Response: {n8n_response.text}")
            else:
                n8n_error = f"n8n returned status {n8n_response.status_code}"
                print(f"❌ {n8n_error}")
                print(f"   Response: {n8n_response.text}")
                
        except requests.exceptions.ConnectionError:
            n8n_error = "Cannot connect to n8n webhook"
            print(f"❌ {n8n_error}")
        except requests.exceptions.Timeout:
            n8n_error = "n8n request timed out"
            print(f"❌ {n8n_error}")
        except Exception as e:
            n8n_error = str(e)
            print(f"❌ Error forwarding to n8n: {e}")

        return {
            "status": "success",
            "id": ticket.id,
            "message": message,
            "category": category,
            "priority": priority,
            "response": response,
            "customer_name": customer_name,
            "customer_email": customer_email,
            "customer_phone": customer_phone,
            "n8n_forwarded": n8n_success,
            "n8n_error": n8n_error if not n8n_success else None
        }
        
    except Exception as e:
        print(f"❌ Error processing ticket: {e}")
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

# ---------------------------
# WEBHOOK ENDPOINT (For n8n to call - PRODUCTION)
# ---------------------------
@app.post("/webhook/ticket")
def webhook_ticket(data: dict):
    print("🔔 Webhook received from n8n:", data)
    
    try:
        message = data.get("message")
        customer_name = data.get("customer_name", "")
        customer_email = data.get("customer_email", "")
        customer_phone = data.get("customer_phone", "")

        if not message:
            return {"error": "No message provided"}

        category, priority, response = analyze_ticket(message)

        db = SessionLocal()
        ticket = Ticket(
            customer_name=customer_name,
            customer_email=customer_email,
            customer_phone=customer_phone,
            message=message,
            category=category,
            priority=priority,
            response=response
        )
        db.add(ticket)
        db.commit()
        db.refresh(ticket)
        db.close()

        return {
            "status": "success",
            "id": ticket.id,
            "message": message,
            "category": category,
            "priority": priority,
            "response": response,
            "customer_name": customer_name,
            "customer_email": customer_email,
            "customer_phone": customer_phone
        }
    except Exception as e:
        print(f"❌ Error in webhook: {e}")
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

# ---------------------------
# GET ALL TICKETS
# ---------------------------
@app.get("/tickets")
def get_all_tickets():
    db = SessionLocal()
    tickets = db.query(Ticket).order_by(Ticket.id.desc()).all()
    db.close()
    
    return [
        {
            "id": t.id,
            "customer_name": t.customer_name,
            "customer_email": t.customer_email,
            "customer_phone": t.customer_phone,
            "message": t.message,
            "category": t.category,
            "priority": t.priority,
            "response": t.response,
            "created_at": t.created_at.isoformat() if t.created_at else None
        }
        for t in tickets
    ]

# ---------------------------
# GET STATISTICS
# ---------------------------
@app.get("/stats")
def get_stats():
    db = SessionLocal()
    tickets = db.query(Ticket).all()
    db.close()
    
    total = len(tickets)
    high = len([t for t in tickets if t.priority == "High"])
    medium = len([t for t in tickets if t.priority == "Medium"])
    low = len([t for t in tickets if t.priority == "Low"])
    
    categories = {}
    for t in tickets:
        categories[t.category] = categories.get(t.category, 0) + 1
    
    return {
        "total": total,
        "high": high,
        "medium": medium,
        "low": low,
        "categories": categories
    }