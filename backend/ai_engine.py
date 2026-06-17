def analyze_ticket(message: str):
    """
    Analyze ticket and return category, priority, and response
    """
    msg = message.lower()

    # Category detection
    if "payment" in msg or "refund" in msg or "billing" in msg or "invoice" in msg or "charge" in msg:
        category = "Billing"
    elif "error" in msg or "crash" in msg or "bug" in msg or "not working" in msg or "failed" in msg:
        category = "Technical"
    elif "login" in msg or "password" in msg or "account" in msg or "access" in msg or "forgot" in msg:
        category = "Account"
    elif "feature" in msg or "suggestion" in msg or "improve" in msg or "request" in msg:
        category = "Feature Request"
    else:
        category = "General"

    # Priority detection
    if any(word in msg for word in ["crash", "down", "not working", "error", "urgent", "immediately", "payment", "refund", "failed", "blocked"]):
        priority = "High"
    elif any(word in msg for word in ["slow", "issue", "problem", "help", "stuck", "confused"]):
        priority = "Medium"
    else:
        priority = "Low"

    # AI Response/Suggestions
    if category == "Technical":
        response = "Please clear your browser/app cache and cookies. Try logging out and back in. Update to the latest version of the app. Check your internet connection. Try using a different browser/device."
    elif category == "Billing":
        response = "Please verify your payment method is up to date. Check your email for the invoice. The refund will process in 3-5 business days. Please provide the transaction ID for faster resolution."
    elif category == "Account":
        response = "Please use the 'Forgot Password' link. Check your spam folder for password reset email. Verify your email address is correct. Contact us from the registered email address."
    elif category == "Feature Request":
        response = "Thank you for your feature request. We have added it to our roadmap and will consider it for future updates."
    else:
        response = "Thank you for contacting support. Our team will investigate your issue and get back to you shortly."

    return category, priority, response