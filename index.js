javascript: (() => {
  const getRepoInfo = () => {
    const urlInfoBranch = [
      'https://github.com/example/pretty-repo',
      'example/pretty-repo',
      'master',
    ];
    const url = window.location.href;
    if (!url.startsWith('https://github.com/')) return urlInfoBranch;
    const menuBranch = document.querySelector('#branch-select-menu');
    if (!menuBranch) return urlInfoBranch;
    const targetBranch = menuBranch.querySelector('.css-truncate-target');
    if (!targetBranch) return urlInfoBranch;
    isLocalTest = false;
    return [url, url.substring(19), targetBranch.innerHTML];
  };

  let isLocalTest = true;
  const [repoUrl, userAndRepo, branch] = getRepoInfo();

  const cssStyle = document.createElement('style');
  cssStyle.setAttribute('id', 'css-style-pr');
  cssStyle.innerHTML = `#editor-pr { padding-bottom: 35%; } #editor-pr, #repo-pr { width: fit-content; font-family: sans-serif; font-size: small; } .folder-container-pr, .file-pr { display: block; padding: 2px 2px 1px 10px; } .folder-pr { color: black; } .file-pr { color: black; } .folder-pr, .file-pr { cursor: pointer; } .folder-pr:hover, .file-pr:hover { background: #00ffff; } .folder-pr:before, .file-pr:before { padding-right: 5px; } a { text-decoration: none; } .i-folder-pr:before { content: '\\1F4C1'; } .i-folder-pr-o:before { content: '\\1F4C2'; } .i-file-pr-code-o:before { content: '\\1F4C4'; } .modal-pr { position: fixed; z-index: 999999; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4); } .modal-pr-content { background-color: #fefefe; margin: auto; padding: 10px; border: 1px solid #888; width: fit-content; } .close-pr { color: #aaaaaa; float: right; font-size: 20px; } .close-pr:hover, .close-pr:focus { color: #000; text-decoration: none; cursor: pointer; }`;
  document.head.appendChild(cssStyle);

  const modalDiv = document.createElement('div');
  modalDiv.setAttribute('id', 'modal-pr');
  modalDiv.setAttribute('class', 'modal-pr');
  modalDiv.innerHTML = `<div class='modal-pr-content'> <span class='close-pr'>&times;</span> <div id='editor-pr'></div> </div>`;
  document.body.appendChild(modalDiv);

  const displayEditor = (paths) => {
    const graph = new Map();
    const visited = new Set();
    for (const { path } of paths) {
      const folder = path.substring(0, path.lastIndexOf('/'));
      if (!graph.has(folder)) graph.set(folder, []);
      graph.get(folder).push(path);
    }
    const editor = [];
    dfs(editor, graph, visited, '');
    document.getElementById('editor-pr').innerHTML = editor.join('');
  };

  const dfs = (editor, graph, visited, folder) => {
    visited.add(folder);
    addFolderOpen(editor, folder);
    const files = graph.get(folder);
    for (const file of files) {
      if (visited.has(file)) continue;
      if (graph.has(file)) dfs(editor, graph, visited, file);
      else addFile(editor, file);
    }
    addFolderClose(editor);
  };

  const addFolderOpen = (editor, folder) => {
    const folderName = getLastWord(folder);
    editor.push(
      `<div class='folder-container-pr'><span class='folder-pr i-folder-pr-o' data-isexpanded='true'>${folderName}</span>`
    );
  };

  const getLastWord = (s) => s.substring(s.lastIndexOf('/') + 1);

  const addFolderClose = (editor) => editor.push('</div>');

  const addFile = (editor, file) => {
    const fileName = getLastWord(file);
    editor.push(
      `<a class='file-pr i-file-pr-code-o' href='${repoUrl}/blob/${branch}/${file}'>${fileName}</a>`
    );
  };

  document.getElementById('editor-pr').addEventListener('click', (event) => {
    const elem = event.target;
    if (isValidFolder(event, elem)) {
      const isexpanded = elem.dataset.isexpanded === 'true';
      if (isexpanded) {
        elem.classList.remove('i-folder-pr-o');
        elem.classList.add('i-folder-pr');
      } else {
        elem.classList.remove('i-folder-pr');
        elem.classList.add('i-folder-pr-o');
      }
      elem.dataset.isexpanded = !isexpanded;
      for (const elemChild of elem.parentElement.children) {
        for (const className of elemChild.classList) {
          if (className === 'file-pr' || className === 'folder-container-pr')
            elemChild.style.display = isexpanded ? 'none' : 'block';
        }
      }
    }
  });

  const isValidFolder = (event, elem) =>
    elem.tagName.toLowerCase() === 'span' &&
    elem !== event.currentTarget &&
    elem.classList.contains('folder-pr');

  const removeModalAndStyle = () => {
    modalDiv.remove();
    cssStyle.remove();
  };

  const close = document.getElementsByClassName('close-pr')[0];
  close.onclick = () => {
    removeModalAndStyle();
  };
  window.onclick = (event) => {
    if (event.target === modalDiv) removeModalAndStyle();
  };

  const raw = {
    tree: [
      { path: 'README.md' },
      { path: 'LICENSE' },
      { path: 'api' },
      { path: 'api/README.md' },
      { path: 'api/Main.kt' },
      { path: 'api/users' },
      { path: 'api/users/UserService.kt' },
      { path: 'api/posts/PostService.kt' },
      { path: 'api/resources' },
      { path: 'api/resources/application.properties' },
      { path: 'web' },
      { path: 'web/README.md' },
      { path: 'web/pages' },
      { path: 'web/pages/Profile.tsx' },
      { path: 'web/pages/Posts.tsx' },
    ],
  };

  if (isLocalTest) {
    console.log('isLocalTest:', isLocalTest);
    console.log('repoUrl:', repoUrl);
    console.log('userAndRepo:', userAndRepo);
    console.log('branch:', branch);
    displayEditor(raw.tree);
  } else {
    fetch(
      `https://api.github.com/repos/${userAndRepo}/git/trees/${branch}?recursive=1`
    )
      .then((response) => response.json())
      .then((data) => displayEditor(data.tree));
  }
})();
