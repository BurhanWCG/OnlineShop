from django.core.mail import send_mail
from django.conf import settings

def send_welcome_email(to_email):
    subject = "Welcome to E-Shop!"
    
    # Properly define the message using triple quotes or concatenation
    message = (
        "Hi there,\n\n"
        "Congratulations on creating your account with E-Shop!\n\n"
        "We are excited to have you on board.\n\n"
        "Best regards,\n"
        "E-Shop Team"
    )

    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [to_email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False
