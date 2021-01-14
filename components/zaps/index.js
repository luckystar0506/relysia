import React, { useEffect } from "react";

function ZapsPage(props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://zapier.com/apps/embed/widget.js?services=vaionex&html_id=foo";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="domain-search-area ptb-70">
      <div className="container">
        <div className="domain-search-content">
          <h2 style={{ marginBottom: 40 }}>Connect with Zapier</h2>
          <div id="foo"></div>
        </div>
      </div>
    </section>
  );
}

export default ZapsPage;
