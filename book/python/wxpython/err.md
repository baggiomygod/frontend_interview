

```
<!-- 包含这段代码 打包后就报错 -->
os.chdir(sys.path[0])


Traceback (most recent call last):
  File "main.py", line 6, in <module>
  File "<frozen importlib._bootstrap>", line 1007, in _find_and_load
  File "<frozen importlib._bootstrap>", line 986, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 680, in _load_unlocked
  File "PyInstaller\loader\pyimod02_importers.py", line 493, in exec_module
  File "src\pages\pdf\pdfTool.py", line 9, in <module>
NotADirectoryError: [WinError 267] 目录名称无效。: 'C:\\Users\\admin\\AppData\\Local\\Temp\\_MEI314002\\base_library.zip'
```