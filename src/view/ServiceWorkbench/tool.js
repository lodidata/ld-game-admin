// 处理输入内容
export const formatHtml = (arr, TYPES) => {
  const data = [];
  [...arr].forEach(o => {
    // 文本类型
    // if (o.nodeType === 3 && o.textContent) {
    //   const msg = o.textContent.replace(/(^\s*)|(\s*$)/g, '')
    //   if (!data.length || data[data.length - 1].contentType !== TYPES.TEXT) {
    //     data.push({
    //       contentType: TYPES.TEXT,
    //       text: msg
    //     })
    //   } else {
    //     data[data.length - 1].text = data[data.length - 1].text + msg
    //   }
    // }

    // 图片类型
    if (o.nodeType === 1 && o.nodeName === 'IMG') {
      if (o.title === 'emoji') {
        if (!data.length || data[data.length - 1].contentType !== TYPES.TEXT) {
          data.push({
            contentType: TYPES.TEXT,
            text: o.name
          })
        } else {
          data[data.length - 1].text = data[data.length - 1].text + o.name
        }
      } else {
        data.push({
          contentType: TYPES.PICTURE,
          smallImgUrl: o.src,
          bigImgUrl: o.src,
          width: o.naturalWidth,
          height: o.naturalHeight
        })
      }
    }else {
      const msg = o.textContent.replace(/(^\s*)|(\s*$)/g, '')
      if (!data.length || data[data.length - 1].contentType !== TYPES.TEXT) {
        data.push({
          contentType: TYPES.TEXT,
          text: msg
        })
      } else {
        data[data.length - 1].text = data[data.length - 1].text + msg
      }
    }
  })

  return data
}
