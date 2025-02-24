import { useState, useEffect } from "react";
import axios from "axios";

const PricingSet = () => {
    const [priceData, setPriceData] = useState([]);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/price-data");
            console.log(response);
            const plans = response.data.price_details.length > 0 
                ? response.data.price_details
                : [{ pricing_id: null, plan_name: "", price: "", description: ["", "", "", "", ""] }];
            
            setPriceData(plans);
        } catch (error) {
            console.error("Error fetching pricing data:", error);
        }
    };

    const handleEditClick = async () => {
        if (editing) {
            try {
                await axios.post("/api/price-data", {
                    price_details: priceData
                });
                console.log("Pricing details updated successfully!");
            } catch (error) {
                console.error("Error updating pricing data:", error);
            }
        }
        setEditing(!editing);
    };

    const handleChange = (index, key, value) => {
        setPriceData(prevData => 
            prevData.map((plan, i) => i === index ? { ...plan, [key]: value } : plan)
        );
    };

    const handleDescriptionChange = (index, lineIndex, value) => {
        setPriceData(prevData => 
            prevData.map((plan, i) => 
                i === index 
                    ? { 
                        ...plan, 
                        description: [
                            ...Array.from({ length: 5 }, (_, j) => plan.description[j] || ""),
                        ].map((desc, j) => j === lineIndex ? value : desc)
                    } 
                    : plan
            )
        );
    };
    
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <div className="d-flex justify-content-between">
                <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
                <div 
                    onClick={handleEditClick} 
                    className="prb-2"
                >
                    <div>{editing ? "Save" : "Edit"}</div>
                </div>
            </div>

            {priceData.map((plan, index) => (
                <div key={index} className="p-4 mb-4 cardpriceplan ">

                    <div className="row my-2">
                        <div className="col-md-4">
                            <label className="text-gray-700">Plan Name:</label>
                        </div>
                        <div className="col-md-5">
                            <input 
                                type="text"
                                className="form-control"
                                value={plan.plan_name}
                                onChange={(e) => handleChange(index, "plan_name", e.target.value)}
                                disabled={!editing}
                            />
                        </div>
                    </div>

                    <div className=" my-2 row">
                        <div className="col-md-4">
                            <label className="block text-gray-700 mt-2">Price:</label>
                        </div>
                        <div className="col-md-5">
                            <input 
                                type="number"
                                className="form-control"
                                value={plan.price}
                                onChange={(e) => handleChange(index, "price", e.target.value)}
                                disabled={!editing}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label className="block text-gray-700 mt-2">Description:</label>
                        </div>
                        <div className="col-md-8">
                            {Array.from({ length: 5 }).map((_, lineIndex) => (
                                <input 
                                    key={lineIndex}
                                    type="text"
                                    className="border p-2 my-2 w-50 rounded mt-1"
                                    value={plan.description[lineIndex] || ""}
                                    onChange={(e) => handleDescriptionChange(index, lineIndex, e.target.value)}
                                    disabled={!editing}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PricingSet;
