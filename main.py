import os
import json
import smtplib
from email.mime.text import MIMEText

from flask import Flask
from flask import request
from flask import jsonify

from flask_cors import CORS, cross_origin
from dotenv import load_dotenv


load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
SENDER = os.getenv('SENDER')
DEBUG = True

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def send_message(sender, to, message):
    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(sender, SECRET_KEY)
        server.sendmail(sender, to, message)

@app.route('/send_mail', methods=['POST'])
@cross_origin()
def send_mail():
    if request.method == 'POST':
        form = json.loads(request.data.decode('utf8'))

        try:
            if not DEBUG:
                msg_to_user = MIMEText(f'{form.get("name")}, мы получили ваше письмо! Ответим в ближайшее время.')
                msg_to_user['Subject'] = 'Academy. Вопросы'
                msg_to_user['From'] = SENDER
                msg_to_user['To'] = form.get("email")
                send_message(SENDER, form['email'], msg_to_user.as_string())

                msg_to_adm = MIMEText(f'Имя: {form.get("name")}\n'
                f'Почта: {form.get("email")}\nТелефон: {form.get("phone")}'
                f'\nКомментарий: {form.get("comment")}')
                msg_to_adm['Subject'] = f'Mail from {form["email"]}'
                msg_to_user['From'] = SENDER
                msg_to_user['To'] = SENDER
                send_message(SENDER, SENDER, msg_to_adm.as_string())

            return jsonify({'message': 'OK!', 'success': True, "status_code": 200}), 200
        except:
            return jsonify({'message': 'Bad request!', 'success': False, "status_code": 400}), 400


if __name__ == '__main__':
    app.run()
