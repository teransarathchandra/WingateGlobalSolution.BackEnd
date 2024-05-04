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

const emailVerification = ({
    title = "Verify your email",
    name = "",
    link = "",
}) => {
    return `
      <div>
  
          <head data-id="__react-email-head">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>${title}</title>
          </head>
          <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Wingate Global Solution verification
          </div>
  
          <body data-id="__react-email-body">
              <h2 data-id="react-email-heading">${title}</h2>
              <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea" />
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0">Hello ${name},</p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0">Thank you for signing up for Wingate Global Solution! Before we can activate your account, we kindly ask you to verify your email address by clicking on the link provided below:</p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0"><a href="${link}">${link}</a></p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0">Thank you for choosing Wingate Global Solution. We look forward to having you as a valued user!</p>
              <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea" />
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0">Best regards,</p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0">Team Wingate Global Solution</p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0">Mt. Lavinia</p>
          </body>
      </div>
      `;
};

const restrictedOrderApprovalEmailHTML = async ({
    title = "Order Approval Request decision",
    name,
    orderID,
    status,
    reason
}) => {
   
    const normalizedStatus = status.trim().toLowerCase();

    return `   
        <div>
        
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>${title}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }

                    .approved {
                        color: green;
                    }

                    .rejected {
                        color: red;
                    }
                </style>
            </head>

            <body>
                <div id="email-content">
                    <h2>Order Status Update</h2>
                    <hr style="width:100%;border:none;border-top:1px solid #000000" />
                    <p>Hello ${name},</p>
                    <p>Your request for the restricted order with ID <strong>${orderID}</strong> has been <span class="${normalizedStatus}">${status}</span>.</p>

                    <!-- Conditionally rendered paragraphs based on whether the order is approved or rejected -->

                    ${normalizedStatus === "approved"? 
                        `<p class="approved">Congratulations! Your order has been approved. You can now complete your payment and continue the order
                        process. Please go to your profile and check under "Approved Orders" to proceed.</p>`
                    : 
                        normalizedStatus === "rejected" ?
                        `<p class="rejected">Unfortunately, your order could not be approved due to the following reason: ${reason}. Please address this
                        issue and submit your request again if possible.</p>`
                        :
                        `<p>Please check your order status for more details.</p>`
                    }

                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />
                    <p>If you have any questions, please don't hesitate to contact our support team.</p>
                    <p>Best regards,</p>
                    <p>Team Wingate Global Solution</p>
                    <p>Mt. Lavinia</p>
                </div>
            </body>
        </div>
    `;
};



module.exports = {
    signUpEmailHTML,
    emailVerification,
    restrictedOrderApprovalEmailHTML,
};
