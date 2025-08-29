import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    const { name, email } = req.query;

    if (!name || !email) {
        return res.status(200).json({ error: 'Nenašel jsem name nebo email parametr.' });
    }

    // Configure your SMTP transport (use environment variables in production)
    const transporter = nodemailer.createTransport({
        host: 'smtp.seznam.cz', // Replace with your SMTP server
        port: 465,
        secure: true,
        auth: {
            user: 'kokotka@frdomains.eu',
            pass: 'kokotka123',
        },
    });

    const mailOptions = {
        from: '"Stopovana Podvrší" <kokotka@frdomains.eu>',
        to: 'mrtomicz@frdomains.eu',
        subject: 'Nová registrace',
        html: `
            <h2>Nová registrace</h2>
            <p><strong>Jméno:</strong> ${name}</p>
            <p><strong>Email/Telefon:</strong> ${email}</p>
            <i>registoravny jako pomocnik</i>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Odesláno v pořádku.' });
    } catch (error) {
        res.status(200).json({ message: 'Nelze odeslat.', error: error });
    }
}