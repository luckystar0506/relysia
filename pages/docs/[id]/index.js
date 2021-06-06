import Header from "../../../components/Layouts/Header";
import Footer from "../../../components/Layouts/Footer";
import GoTop from "../../../components/Layouts/GoTop";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import {pageListData} from "../../../components/docs/data/DocsPageList";

import MainBackButton from "../../..//components/docs/new-component/MainBackButton";
import GoBackAndNextButton from "../../..//components/docs/new-component/GoBackAndfNextButton";

import { Layout } from "antd";

import NoSSR from "react-no-ssr";
import {listData} from "../../../components/docs/data/DocsListData";



function index(){
    const router = useRouter();
    let {id} = router.query;
     const [value, setValue] = React.useState(0);

     useEffect(() => {
         if (id === "authentication") {
             setValue(0);
         } else if (id === "user") {
             setValue(1);
         } else if (id === "sms-verification") {
             setValue(2);
         }


     }, [id]);


    return (
            <NoSSR>
                <div>
                    <Header />
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
                        <Layout className="site-layout" style={{ backgroundColor: "#ffffff" }}>
                            <div className="mt-4" >
                                <div className="page-container">
                                    <MainBackButton title={`${listData[value].title}`} />

                                    {
                                        pageListData[value == null ? 0 : value]
                                    }

                                    <GoBackAndNextButton data={{listData, value}}/>
                                </div>
                            </div>
                        </Layout>
                    </Layout>
                    </section>
                    <Footer />
                    <GoTop scrollStepInPx="50" delayInMs="16.66" />
                </div>
            </NoSSR>
        )
}


export default index;