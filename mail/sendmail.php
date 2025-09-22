<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    $to = "direccioncomercial@stsinnova.com";
    $email_subject = "📩 Nuevo mensaje de contacto: " . $subject;
    $email_body = "
    <html>
    <head><title>Nuevo mensaje de contacto</title></head>
    <body>
      <h2>Nuevo mensaje desde la página web</h2>
      <p><strong>Nombre:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Asunto:</strong> {$subject}</p>
      <p><strong>Mensaje:</strong><br>{$message}</p>
    </body>
    </html>";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: {$name} <{$email}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        header("Location: /components/gracias.html");
        exit();
    } else {
        echo "Error al enviar el mensaje.";
    }
}
?>
