import "./TermsOfUse.css";

const TermsOfUse = ({ termsOrPolicy }) => {
    return (
        <>
            {termsOrPolicy == 1 && (
                <div className="privacy-main">
                    <div className="d-flex justify-content-center my-5">
                        <h1 style={{ color: "var(--sec)" }}>Terms Of Use</h1>
                    </div>
                    <p className="terms-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dolores natus tempora commodi? Vitae, deleniti. Eos possimus ipsum magnam officia eum minus, repellendus veniam ut rerum earum neque! Amet.
                        <br /><br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptates delectus tempora corporis eos aspernatur quasi repellat in iste vel laborum, magni voluptatem, sed et reiciendis dolore. Natus, obcaecati saepe?
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