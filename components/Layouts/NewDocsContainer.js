import { Layout } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GridItem from "../../components/docs/new-component/grid-item";
import styles from "../../static/styles/NewDocsContainer.module.css";



function NewDocsContainer(props){
  console.log(props.data);

  console.log(props.data.groupData);
  
  
    const router = useRouter();

    useEffect(() => {
        if(router.pathname === "/docs"){

        } else if (router.pathname === "/docs/general"){
          console.log("genertal");
          

        } else if (router.pathname === "docs/open") {
          console.log("open");
        } else if (router.pathname === "docs/sms-verification") {
          console.log("sms");
        } 
        // else if (router.pathname === "docs") {

        // }
    }, [router.query.topic]);
    


    return (
    <section
      className="about-area ptb-80 more-top-padding"
      style={{ paddingBottom: 0 }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          borderTop: "#eaeaea 0.7px solid",
        }}
      >
        <Layout className="site-layout align-items-center" style={{ backgroundColor: "#ffffff" }}>
            <div className="mt-4" >

              <div className={styles.overview} >
                <h1>Overview</h1>
              </div>

                <div  className="row justify-content-center">
                    {/* // list of data */}

                {props.data.groupData.map((item) =>{
                  return <GridItem data={item} />

                })}

            </div>
            </div>
        </Layout>
      </Layout>
    </section>
  );

}


export default NewDocsContainer;