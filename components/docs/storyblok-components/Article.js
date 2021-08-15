import React from "react";
import SbEditable from "storyblok-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"

export default class extends React.Component {
  render() {
    const { blok } = this.props;
    const { full } = this.props;
    const { published_at } = this.props;
    const { slug } = this.props;
    const makeImageArr = ({ slide }) => {
      let imgArray = [];
      slide.forEach((item) => {
        let temp = {};
        temp.original = item.image.filename;
        imgArray.push(temp);
      });
      return imgArray;
    }
    return (      
      <SbEditable content={blok}>
        <div className="my-6">
          <div className="w-full">            
            {blok.image.filename != null && blok.image.filename != "" ? (
              <div className="blog__article__image">
                <img src = {blok.image.filename}/>
              </div>
            ):""}
            
            {blok.video.filename != null && blok.video.filename != "" ? (
              <div className="blog__article__image">
                <video controls>
                  <source src={blok.video.filename} type="video/mp4"></source>
                </video>
              </div>
            ):""}              
            {blok.slide.length != 0 ? (
              <div className="blog__article__image">
                <ImageGallery 
                  items={makeImageArr(blok)}
                  showThumbnails={false}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  autoPlay={true}
                />
              </div>
            ):""}              
          </div>
          <div className="blog__article__title">
            {
              full == true ? 
              (
                <h3> {blok.title} </h3>
              ) 
              :
              (
                <a href={"/blog/" + slug}>
                  <h3> {blok.title} </h3>
                </a>
              )
            }
            
          </div>
          {/* <div className="blog__article__icons">
            <div className="row text-gray-500">
            {blok.nav.map((blok) => {
                const genClass = (blok) => {
                  const { icon } = blok;
                  return `${icon.type} ${icon.icon}`
                }
                return  (
                  <a href="#" key={blok._uid}><i className={genClass(blok)}></i>{' ' + blok.name}</a>
                )}
              )}
            </div>
          </div> */}
          {full === true ? (
            <div className="blog__article__text">
            <p>{blok.full_text}</p>
          </div>
          ): (
            <div className="blog__article__text">
            <p>{blok.intro_text}</p>
          </div>
          )}
          <p className="blog__published">Published at 
            {
              " " + new Date(published_at).toLocaleString()
            }
          </p>
        </div>
      </SbEditable>
    );
  }
}
