import SbEditable from "storyblok-react";

const Feature = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <div>
        <h2 className="text-lg"> {blok.name} </h2>
      </div>
    </SbEditable>
  );
};

export default Feature;
