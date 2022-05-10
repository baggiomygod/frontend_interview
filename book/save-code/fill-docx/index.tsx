/**
 * 页面导出doxx
 */
import { Button } from 'antd'
import React, { ReactElement } from 'react'

// docxtemplater jszip-utils jszip file-saver
interface Props {}
export default function FillDocx({}: Props): ReactElement {
  // node填充
  const nodeFill = () => {
    $tools.fillDocx('C://Users//admin//Desktop//文件模板', '施工招标文件模板(测试转换)', {})
  }

  const topdf = async () => {
    await $tools.toPdf(
      'C:/Users/admin/Desktop/文件模板/施工招标文件模板(测试转换)_1627459463267.docx',
      'C:/Users/admin/Desktop/文件模板/out'
    )
  }

  const readDocxBase64 = () => {
    // C:/Users/admin/Desktop/文件模板/docx-base64.txt
    const docxBase64Str = $tools.readFileStr('C:/Users/admin/Desktop/文件模板/docx-base64.txt')
    $tools.base64ToLocal(docxBase64Str, 'C:/Users/admin/Desktop/文件模板', 'docx-base64.docx')
  }
  return (
    <div style={{ margin: '20px' }}>
      <Button onClick={nodeFill}>node填充docx</Button>
      <Button onClick={topdf}>转pdf</Button>
      <Button onClick={readDocxBase64}>base64转docx</Button>
    </div>
  )
}
