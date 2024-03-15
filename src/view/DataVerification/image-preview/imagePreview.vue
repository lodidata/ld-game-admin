<template>
    <div></div>
</template>
<script>
import iconLeft from "./images/icon-left.png";
import iconRight from "./images/icon-right.png";
import iconClose from "./images/icon-close.png";
import iconRotate from "./images/icon-rotate.png";
import iconNoImages from "./images/icon-no-images.png";
export default {
  data() {
    const i18n_lang = this.$t('feedback');
    return {
      i18n_lang: i18n_lang,
      opPicsList: [
        {
          name: "none",
          url: iconNoImages
        }
      ],
      imgName: "",
      bigImage: null,
      currentImageName: "",
      currentRotate: 0
    };
  },
  props: {
  },
  methods: {
    loadImages(opPics) {
      this.opPicsList.splice(0, this.opPicsList.length);
      // debugger
      opPics.forEach((element, index) => {
        //判断图片路径是否有https前缀
        this.opPicsList.push({
          name: index,
          url: element
        });
      });
      this.handleView("0");
    },
    rollImg() {
      /* 获取当前页面的缩放比
            若未设置zoom缩放比，则为默认100%，即1，原图大小
        */

      var zoom = parseInt(this.bigImage.style.zoom) || 100;
      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
            wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
        */
      zoom += event.wheelDelta / 12;
      /* 如果缩放比大于0，则将缩放比加载到页面元素 */
      if (zoom >= 100) {
        this.bigImage.style.zoom = zoom + "%";
      }
      /* 如果缩放比不大于0，则返回false，不执行操作 */
      return false;
    },
    handleView(name) {
      if (this.opPicsList[0].name == "none") {
        this.$msg({
          type: 'error',
          message: `${this.i18n_lang.feedback33}`
        })
        return;
      }
      this.currentImageName = name;

      let elementArr = document.getElementsByClassName("showBigImage");
      if (elementArr.length == 0) {
        this.createShowImage();
      }
      for (let y = 0; y < this.opPicsList.length; y++) {
        if (name == this.opPicsList[y].name) {
          document.getElementById("bigImageE").src = this.opPicsList[y].url;
          // debugger
          // document.getElementById("bigImageE").width = this.opPicsList[y].url;
          // document.getElementById("bigImageE").height = this.opPicsList[y].url;
          // for (let i = 0; i < elementArr.length; i++) {
          //   elementArr[i].style.display = "block";
          // }
          break;
        }
      }
    },
    closeImageShow() {
      let elementArr = document.getElementsByClassName("showBigImage");
      let main = document.getElementById("app");
      let count = elementArr.length;
      for (let i = 0; i < count; i++) {
        main.removeChild(elementArr[0]);
      }
    },
    rotateImage() {
      let imageE = document.getElementById("bigImageE");
      this.currentRotate = (this.currentRotate + 90) % 360;
      imageE.style.transform =
        imageE.style.transform.split(" ")[0] +
        " rotate(" +
        this.currentRotate +
        "deg)";
    },
    toLeftImage() {
      for (let y = 0; y < this.opPicsList.length; y++) {
        if (this.currentImageName == this.opPicsList[y].name) {
          if (y - 1 < 0) {
            this.$msg({
              type: 'error',
              message: `${this.i18n_lang.feedback34}`
            })
          } else {
            this.currentImageName = this.opPicsList[y - 1].name;
            let imageE = document.getElementById("bigImageE");
            imageE.src = this.opPicsList[y - 1].url;
            // 加载完成执行
            imageE.onload = function() {
              if (imageE.naturalHeight < window.innerHeight) {
                //图片高度小于屏幕则需要垂直居中处理
                imageE.style.height = imageE.naturalHeight + "px";
                imageE.style.top = "50%";
                imageE.style.position = "relative";
                imageE.style.transform = "translateY(-50%)";
                imageE.style.zoom = "100%";
              } else {
                //需要去除前一张图片的效果
                imageE.style.height = window.innerHeight + "px";
                imageE.style.top = "0";
                imageE.style.position = "relative";
                imageE.style.transform = "translateY(0%)";
                imageE.style.zoom = "100%";
              }
            };
          }
          break;
        }
      }
    },
    toRightImage() {
      for (let y = 0; y < this.opPicsList.length; y++) {
        if (this.currentImageName == this.opPicsList[y].name) {
          if (y + 1 == this.opPicsList.length) {
            this.$msg({
              type: 'error',
              message: `${this.i18n_lang.feedback35}`
            })
          } else {
            this.currentImageName = this.opPicsList[y + 1].name;
            let imageE = document.getElementById("bigImageE");
            imageE.src = this.opPicsList[y + 1].url;
            // 加载完成执行
            imageE.onload = function() {
              if (imageE.naturalHeight < window.innerHeight) {
                //图片高度小于屏幕则需要垂直居中处理
                imageE.style.height = imageE.naturalHeight + "px";
                imageE.style.top = "50%";
                imageE.style.position = "relative";
                imageE.style.transform = "translateY(-50%)";
                imageE.style.zoom = "100%";
              } else {
                //需要去除前一张图片的效果
                imageE.style.height = window.innerHeight + "px";
                imageE.style.top = "0";
                imageE.style.position = "relative";
                imageE.style.transform = "translateY(0%)";
                imageE.style.zoom = "100%";
              }
            };
          }
          break;
        }
      }
    },
    createShowImage() {
      //创建图片显示
      // let elementArr = document.getElementsByClassName("showBigImage");
      // if (elementArr.length == 0) {
      let main = document.getElementById("app");
      let topContainer = document.createElement("div");
      let scrollContainer = document.createElement("div");
      topContainer.style.position = "fixed";
      topContainer.style.zIndex = "1001";
      topContainer.style.background = "rgba(0,0,0,0.80)";
      topContainer.style.height = "100%";
      topContainer.style.width = "100%";
      topContainer.style.top = "0";
      topContainer.style.left = "0";
      topContainer.style.textAlign = "center";
      topContainer.className = "showBigImage";
      // topContainer.style.display = "none";

      let imageContainer = document.createElement("div");
      imageContainer.style.width = window.innerWidth + "px";
      imageContainer.style.height = window.innerHeight + "px";
      imageContainer.style.margin = "0 auto";
      imageContainer.style.overflow = "auto";
      imageContainer.style.top = "50%";
      imageContainer.style.position = "relative";
      imageContainer.style.transform = "translateY(-50%)";

      let imageE = document.createElement("img");
      imageE.src = iconNoImages;
      imageE.title = `${this.i18n_lang.feedback36}`;
      imageE.id = "bigImageE";
      // 加载完成执行
      imageE.onload = function() {
        if (imageE.naturalHeight < window.innerHeight) {
          //图片高度小于屏幕则需要垂直居中处理
          // imageE.style.width = "100%";
          imageE.style.top = "50%";
          imageE.style.position = "relative";
          imageE.style.transform = "translateY(-50%)";
        } else {
          imageE.style.height = window.innerHeight + "px";
        }
      };
      // imageE.style.width = "100%";
      // imageE.style.width = "475px";
      // imageE.style.height = window.innerHeight + 'px';

      // imageE.style.objectFit= "scale-down";
      // imageE.style.height = "100%";
      // imageE.style.top = "50%";
      // imageE.style.position = "relative";
      // imageE.style.transform = "translateY(-50%)";
      this.bigImage = imageE;

      //添加鼠标滚轮事件缩放图片
      if (imageE.addEventListener) {
        // IE9, Chrome, Safari, Opera
        imageE.addEventListener("mousewheel", this.rollImg, false);
        // Firefox
        imageE.addEventListener("DOMMouseScroll", this.rollImg, false);
      } else {
        // IE 6/7/8
        imageE.attachEvent("onmousewheel", this.rollImg);
      }
      imageContainer.appendChild(imageE);
      topContainer.appendChild(imageContainer);

      main.appendChild(topContainer);

      //创建点击左右浏览按钮
      //左按钮
      let imgLeft = document.createElement("img");
      imgLeft.src = iconLeft;
      imgLeft.style.zIndex = "1001";
      imgLeft.style.position = "fixed";
      imgLeft.style.top = "50%";
      imgLeft.style.transform = "translateY(-50%)";
      imgLeft.style.left = "12%";
      imgLeft.style.cursor = "pointer";
      imgLeft.className = "showBigImage";
      //添加鼠标点击事件切换图片
      imgLeft.addEventListener("click", this.toLeftImage);
      //右按钮
      let imgRight = document.createElement("img");
      imgRight.src = iconRight;
      imgRight.style.zIndex = "1001";
      imgRight.style.position = "fixed";
      imgRight.style.top = "50%";
      imgRight.style.transform = "translateY(-50%)";
      imgRight.style.right = "12%";
      imgRight.style.cursor = "pointer";
      imgRight.className = "showBigImage";
      //添加鼠标点击事件切换图片
      imgRight.addEventListener("click", this.toRightImage);

      //大图片选转
      let imgRotate = document.createElement("img");
      imgRotate.id = "rotateImageBtn";
      imgRotate.src = iconRotate;
      imgRotate.style.zIndex = "1001";
      imgRotate.style.position = "fixed";
      imgRotate.style.top = "5%";
      imgRotate.style.right = "5%";
      imgRotate.style.transform = "translateY(-50%)";
      imgRotate.style.cursor = "pointer";
      imgRotate.className = "showBigImage";
      //添加鼠标点击事件旋转大图
      imgRotate.addEventListener("click", this.rotateImage);

      //关闭按钮
      let imgClose = document.createElement("img");
      imgClose.src = iconClose;
      imgClose.style.zIndex = "1001";
      imgClose.style.position = "fixed";
      imgClose.style.top = "5%";
      imgClose.style.right = "1%";
      imgClose.style.transform = "translateY(-50%)";
      imgClose.style.cursor = "pointer";
      imgClose.className = "showBigImage";
      //添加鼠标点击事件关闭显示大图
      imgClose.addEventListener("click", this.closeImageShow);

      // imgLeft.style.display = "none";
      // imgRight.style.display = "none";
      // imgClose.style.display = "none";
      main.appendChild(imgLeft);
      main.appendChild(imgRight);
      main.appendChild(imgClose);
      main.appendChild(imgRotate);
      // main.style.textAlign = "center";
      // this.imgName = name;
      // this.visible = true;
      // }
    }
  },
  mounted() {
    // this.loadImages();
  }
};
</script>
