// 匹配xml里的属性：投标报价="123.12" 的值
const patXmlPrice/^<.*>\s*\r?\n?<项目\s.*(投标报价=\"(\d+(\.\d+)?)\")\s.*>.*/