import Link from "../../common/ActiveLink";

function GoBackAndNextButton(props){
    const {listData, value} = props.data;
    console.log(value === listData.length-1);
    

    
    
    return (
        <div style={{height: "60px",marginTop: "20px"}}>
            <div style={{height: "1px", backgroundColor: "#000000"}}></div>
            <div style={{display: "flex", height: "90%", alignItems: "center", justifyContent: "space-between"}}>

                <div style={{display: "inline-flex"}}>
                    <p>hello</p>
                    <Link activeClassName="active" href={`${value === 0 ? "/docs": `${listData[value -1].id}`}`} >
                     <a>
                       <p style={{marginLeft: "10px"}}>{value ===0 ? "Overview": `${listData[value -1].title}`}</p>
                     </a>
                    </Link>
                </div>

                <div style={{display: `${value === listData.length-1 ? "none":"inline-flex"}`}}>
                    <p>ho</p>
                    <Link activeClassName="active" href={`${value === listData.length-1 ? "": `/docs/${listData[value+1].id}`}`}>
                        <a>
                            <p style={{marginLeft: "10px"}}>{value === listData.length-1 ? " ": `${listData[value+1].title}`}</p>
                        </a>
                    </Link>
                    
                </div>

            </div>
        </div>
    )

}

export default GoBackAndNextButton;