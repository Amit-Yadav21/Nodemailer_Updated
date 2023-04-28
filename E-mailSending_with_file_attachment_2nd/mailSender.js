const nodemailer = require('nodemailer');
const fs = require('fs');
const { mails } = require('./AllMail')
// console.log(mails);

const mailSender = async () => {
    // .......................................................................... Find Unique Mails ./
    // // ------------------------------------------------- Date and Time ?
    const options = { timeZone: 'Asia/Kolkata' };
    const Data_time = new Date().toLocaleString('en-US', options);
    // console.log(Date_time);
    // ---------------------- .

    const fs = require('fs');
    const unique = mails.filter((item, index) => mails.indexOf(item) === index); 
                  // find unique mail
    // ------------------------------------ mail seperete one object only 50 mail .
    const mail_Count = unique.length // total mails

    const groupSize = 50;
    const arrMails = [`Total_mail : ${mail_Count}`]

    for (let i = 0; i < unique.length; i += groupSize) {
        const group = unique.slice(i, i + groupSize)

        const mailsObj = { Date_Time: Data_time, Count: group.length, HrMails: group }
        arrMails.push(mailsObj)
    }
    // ------------------------------------------------------------------ create file here ./
    if (fs.existsSync('./Unique_mail.json')) {
        const readFile = fs.readFileSync('./Unique_mail.json', 'utf-8')
        const readData = JSON.parse(readFile)
        for (let obj of arrMails) {
            readData.push(obj)
        }
        fs.writeFileSync('./Unique_mail.json', JSON.stringify(readData, null, 4))
        console.log('AllReady created file and store Unique mails...');
    } else {
        fs.writeFileSync('./Unique_mail.json', JSON.stringify(arrMails, null, 4))
        console.log('CreatNewFile store Unique mails...');
    }

    // ................................................................................. Find Dublicate Mails ./

    const dublicate = mails.filter((item, index) => mails.indexOf(item) !== index); // find dublicate mail
    const mail_Count1 = dublicate.length     // find total mails

    // ------------------------------------ mail seperete one object only 50 mail/ [{mail:[50]}] .
    const groupSize1 = 50;
    const arrMails1 = [`Total_mail : ${mail_Count1}`, `Date_Time:${Data_time}`]

    for (let i = 0; i < dublicate.length; i += groupSize1) {
        const group = dublicate.slice(i, i + groupSize1)

        const mailsObj = { Count: group.length, HrMails: group }
        arrMails1.push(mailsObj)
    } 
    // ------------------------------------------------------------------ create file here ./
    if (fs.existsSync('./Dublicate_mail.json')) {
        const readFile = fs.readFileSync('./Dublicate_mail.json', 'utf-8')
        const readData = JSON.parse(readFile)
        for (let obj of arrMails1) {
            readData.push(obj)
        }
        fs.writeFileSync('./Dublicate_mail.json', JSON.stringify(readData, null, 4))
        console.log('AllReady created file and store Dublicate mails...');
    } else {
        fs.writeFileSync('./Dublicate_mail.json', JSON.stringify(arrMails1, null, 4))
        console.log('CreatNewFile store Dublicate mails...');
    }

    // ---------------------------------------------------------- ./
    let mailCount = 0;  // How many mails send ......................... ./
    const mail_Count2 = unique.length // total mails ....................... ./

    // --------------------------------------------------------------- find whitch mail applyed Before .
    const MailArr = []
    const UniqueMails = fs.readFileSync('./Unique_mail.json','utf-8')
    const parseMails = JSON.parse(UniqueMails)

    parseMails[1].HrMails.forEach(element => {
        MailArr.push(element)
    }); 
    // ----------------------------------------------------- ./

    for (let mail of unique) {
        try {
            let transPorter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'amit21@navgurukul.org',
                    pass: 'amit21yadav'
                }
            })
            let body = `<p>Hello Ma'am/sir,</p>
                        <p>                       
                        My name is Amit Yadav, and I am looking for a job as a backend (Node.js) developer. I have completed web development course at Navgurukul, Dharamshala, Himachal Pradesh. I possess good knowledge of Python, JavaScript, databases (MySQL, MongoDB), ExpressJS, and NodeJS.
                        </p>
                        <p>Please find my resume attached below. </p>
                        <p><b>Regard's,</b><br>Amit Yadav<br>Mobile No. : (+91) 9651025253<br>Personal mail :- yadavamit222137@gmail.com</p>`;

            let info = await transPorter.sendMail({

                from: '"Amit Yadav" <amit21@navgurukul.org>',
                to: mail,
                subject: "Application for a job as Backend Developer",
                // text: "This is mail by me",
                html: body,
                attachments: [
                    {
                        filename: "AMIT_YADAV.pdf",
                        content: fs.createReadStream("./AMIT_YADAV.pdf")
                    }
                ]
            });
            console.log(info);
            mailCount++
            console.log(`mail has been sent / Total mail : ${mailCount}/${mail_Count2} `);
        } catch (error) {
            console.log(error);
        }
    }
}
mailSender()