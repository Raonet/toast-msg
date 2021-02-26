const raoMsg = {
  defaultSetting: {
    color: "#333333", //文本颜色

    bgColor: "#ffffff", // 背景颜色

    text: "文本内容", // 文本内容

    duration: 5, // 持续时间

    isBtn: false, // 是否显示操作按钮

    btnText: "按钮", // 按钮文本

    btnColor: "#333333", // 按钮颜色

    btnHoverColor: "blue", // 按钮hover颜色

    size: "14px", // 字体大小
  },
  /**
   * @Params content 文本
   * @Params option {
   *   color 弹出框颜色
   *   bgColor 弹出框背景颜色
   *   duration 持续时间
   *   isBtn 是否显示按钮
   *   btnText 按钮文本
   *   btnColor 按钮颜色
   *   btnHoverColor 按钮hover颜色
   * }
   **/
  message: function (content, option) {
    return new Promise((resolve, reject) => {
      if (option) {
        var {
          color,
          bgColor,
          size,
          duration,
          isBtn,
          btnText,
          btnColor,
          btnHoverColor,
          size,
        } = option;
      } else {
        var color,
          bgColor,
          size,
          duration,
          isBtn,
          btnText,
          btnColor,
          btnHoverColor,
          size;
      }
      var text = content;
      color ? "" : (color = this.defaultSetting.color);
      bgColor ? "" : (bgColor = this.defaultSetting.bgColor);
      text ? "" : (text = this.defaultSetting.text);
      duration ? "" : (duration = this.defaultSetting.duration);
      isBtn ? "" : (isBtn = this.defaultSetting.isBtn);
      btnText ? "" : (btnText = this.defaultSetting.btnText);
      btnColor ? "" : (btnColor = this.defaultSetting.btnColor);
      btnHoverColor ? "" : (btnHoverColor = this.defaultSetting.btnHoverColor);
      size ? "" : (size = this.defaultSetting.size);
      var $dom = document.createElement("DIV");
      var $btn = document.createElement("DIV");
      if (!document.getElementById("raoMsgContainer")) {
        var $container = document.createElement("DIV");
        $container.id = "raoMsgContainer";
        document.body.appendChild($container);
      } else {
        $container = document.getElementById("raoMsgContainer");
      }
      $btn.id = "raoMsgBtn";
      $btn.color = btnColor;
      $btn.append(btnText);
      $btn.onmouseover = () => {
        $btn.style.color = btnHoverColor;
      };
      $btn.onmouseleave = () => {
        $btn.style.color = btnColor;
      };
      $dom.id = "raoMsg";
      $dom.className = "rao-msg";
      $dom.style.background = bgColor;
      $dom.style.color = color;
      $dom.append(text);
      if (isBtn) {
        $dom.appendChild($btn);
      }
      $container.style.fontSize = size;
      $container.appendChild($dom);
      $container.style.left =
        "calc(50% - " + $container.offsetWidth / 2 + "px)";
      function clear() {
        clearTimeout(timer);
        timer = null;
      }
      var timer = setTimeout(() => {
        $dom.remove();
        clear();
        resolve();
      }, duration * 1000);
      $dom.onmouseover = () => {
        clearTimeout(timer);
      };
      $dom.onmouseleave = () => {
        timer = setTimeout(() => {
          $dom.remove();
          clear();
          resolve();
        }, duration * 1000);
      };
      $btn.onclick = () => {
        $dom.remove();
        clear();
        reject();
      };
    });
  },
};

window.raoMsg = raoMsg;
