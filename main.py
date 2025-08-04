import json
import smtplib
from email.mime.text import MIMEText

from flask import Flask
from flask import request
from flask import make_response


def send_message(sender, to, message):
    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(sender, '3fOB8j0tApfcgNTjDsa2')
        server.sendmail(sender, to, message)


app = Flask(__name__)

@app.route('/send_mail', methods=['POST'])
def send_mail():
    if request.method == 'POST':
        form = json.loads(request.data.decode('utf8'))
        sender = 'aleksey.chukalov@mail.ru'

        try:
            msg_to_user = MIMEText(f'{form.get("name")}, мы получили ваше письмо! Ответим в ближайшее время.')
            msg_to_user['Subject'] = 'Academy. Вопросы'
            msg_to_user['From'] = sender
            msg_to_user['To'] = form.get("email")
            send_message(sender, form['email'], msg_to_user.as_string())

            msg_to_adm = MIMEText(f'Имя: {form.get("name")}\n'
            f'Почта: {form.get("email")}\nТелефон: {form.get("phone")}'
            f'\nКомментарий: {form.get("comment")}')
            msg_to_adm['Subject'] = f'Mail from {form["email"]}'
            msg_to_user['From'] = sender
            msg_to_user['To'] = sender
            send_message(sender, sender, msg_to_adm.as_string())

            return make_response('OK', 200)
        except:
            return make_response('Bad request', 400)


if __name__ == '__main__':
    app.run()
