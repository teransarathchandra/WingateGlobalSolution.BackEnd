const signUpEmailHTML = (userName) =>
    `
<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #333;">
    <h2>Welcome Aboard, ${userName}!</h2>
    <p>Thank you for signing up with Wingate Global Solution. We're thrilled to have you on board and look forward to supporting your logistic needs.</p>
    <p>If you have any questions or need assistance, feel free to contact our support team at wingatesolutionpvt@outlook.com.</p> <br/>
    <p>Best Regards,</p>
    <p>Your Team at Wingate Global Solution</p>
</div>
`;

//<img src="https://i.ibb.co/cxTy1sY/Logo.png" alt="Wingate Global Solution Logo" style="max-width: 100px; margin-bottom: 20px;"/>

const restrictedOrderEmailHTML = (restrictedOrder) => 
    `
<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #333;">
    <h2>Restricted Order ID : ${restrictedOrder.restrictedOrderId} . This Order is Restricted !</h2>
    <p>Best Regards,</p>
    <p>Your Team at Wingate Global Solution</p>
</div>
`;

module.exports = { signUpEmailHTML, restrictedOrderEmailHTML };