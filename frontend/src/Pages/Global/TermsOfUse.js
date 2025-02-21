import "./TermsOfUse.css";

const TermsOfUse = ({ termsOrPolicy }) => {
    return (
        <>
            {termsOrPolicy == 1 && (
                <div className="privacy-main">
                    <div className="d-flex justify-content-center my-5">
                        <h1 style={{ color: "var(--sec)" }}>Terms Of Use and Disclaimers</h1>
                    </div>
                    <p className="terms-para">



                    Terms of Use and Disclaimers for Modern Delphi
                    <br/><br/>
                    Welcome to Modern Delphi. By accessing or using our website, you agree to comply with and be bound by the following terms and disclaimers. If you do not agree with these terms, please refrain from using our site.
                    <br/><br/><strong>1. </strong>Use of the Website You may use this website for lawful, personal, and non-commercial purposes only. Unauthorized use, including data mining, scraping, or reverse engineering, is strictly prohibited.
                    <br/><br/><strong>2. </strong>User Conduct By using this website, you agree not to:
                    -Engage in any unlawful or harmful activities.
                    -Violate any applicable laws or regulations.
                    -Interfere with the website's functionality or security.
                    <br/><br/><strong>3. </strong>General Information Disclaimer The content on this website, including consultation and insights, is provided for informational and entertainment purposes only. It does not constitute legal, financial, medical, or psychological advice. Always seek the advice of a qualified professional regarding your specific needs or circumstances.
                    <br/><br/><strong>4. </strong>No Professional-Client Relationship Use of this website or its services does not create a professional-client relationship between you and Modern Delphi or its representatives.
                    <br/><br/><strong>5. </strong>Accuracy and Reliability Disclaimer Modern Delphi makes no guarantees regarding the accuracy, reliability, or completeness of the information provided. All content is subject to change without notice.
                    <br/><br/><strong>6. </strong>Third-Party Links and Content This website may include links to third-party websites or content. Modern Delphi is not responsible for the accuracy, reliability, or availability of such content.
                    <br/><br/><strong>7. </strong>Personal Responsibility By using this website, you acknowledge that any decisions or actions you take based on its content are your sole responsibility. Modern Delphi is not liable for any outcoms resulting from your use of this website or any associated consultations.
                    <br/><br/><strong>8. </strong>Intellectual Property Rights All content, including text, graphics, logos, and designs, is the property of Modern Delphi unless otherwise stated. Unauthorized use or reproduction of this content is prohibited.
                    <br/><br/><strong>9. </strong>Refund and Service Policy All services are non-refundable once rendered. Please contact us for any issues or concerns with your consultation.
                    <br/><br/><strong>10.</strong> Limitation of Liability Modern Delphi is not liable for any damages arising from the use of this website or its content, including direct, indirect, or consequential damages.
                    <br/><br/><strong>11.</strong> Indemnification You agree to indemnify and hold harmless Modern Delphi, its affiliates, and representatives from any claims, liabilities, or expenses arising from your use of the website or violation of these terms.
                    <br/><br/><strong>12.</strong> Governing Law This website is governed by the laws of [Your Province/State and Country]. By using this website, you consent to the exclusive jurisdiction of the courts in this jurisdiction.
                    <br/><br/><strong>13.</strong> Changes to These Terms Modern Delphi reserves the right to update or modify these terms at any time without prior notice. Continued use of the website constitutes acceptance of the updated terms.


                    </p>
                </div>
            )}

            {termsOrPolicy == 0 && (
                <div className="privacy-main">
                    <div className="d-flex justify-content-center my-5">
                        <h1 style={{ color: "var(--sec)" }}>Privacy Policy</h1>
                    </div>
                    <p className="terms-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dolores natus tempora commodi? Vitae, deleniti. Eos possimus ipsum magnam officia eum minus, repellendus veniam ut rerum earum neque! Amet.
                        <br /><br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptates delectus tempora corporis eos aspernatur quasi repellat in iste vel laborum, magni voluptatem, sed et reiciendis dolore. Natus, obcaecati saepe?
                    </p>
                </div>
            )}

        </>
    )
}
export default TermsOfUse;