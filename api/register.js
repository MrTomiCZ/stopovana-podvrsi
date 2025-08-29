import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    const { name, email } = req.query;

    if (!name || !email) {
        return res.status(200).json({ error: 'Missing name or email parameter.' });
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
        from: '"Stopovana Podvrší" <kokot@frdomains.eu>',
        to: 'mrtomicz@frdomains.eu',
        subject: 'Nová registrace',
        html: `
            <h2>Nová registrace</h2>
            <p><strong>Jméno:</strong> ${name}</p>
            <p><strong>Email/Telefon:</strong> ${email}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        res.status(200).json({ message: 'Failed to send email.', error: error });
    }
}