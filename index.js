javascript: (() => {
  const getRepoUrl = () => {
    const url = window.location.href;
    if (!url.startsWith('https://github.com/'))
      return 'https://github.com/example/pretty-repo';
    isLocalTest = false;
    return url;
  };

  const getBranch = () => {
    const defaultBranch = 'master';
    const menu = document.querySelector('#branch-select-menu');
    if (!menu) return defaultBranch;
    const target = menu.querySelector('.css-truncate-target');
    if (!target) return defaultBranch;
    isLocalTest = false;
    return target.innerHTML;
  };

  let isLocalTest = true;
  const repoUrl = getRepoUrl();
  const userAndRepo = repoUrl.substring(19);
  const branch = getBranch();
  console.log('repoUrl:', repoUrl);
  console.log('userAndRepo:', userAndRepo);
  console.log('branch:', branch);

  // const cssStyle = document.createElement('style');
  // cssStyle.innerHTML = ""; //
  // document.head.appendChild(cssStyle);

  document.body.innerHTML =
    '<div id="myjmodal" class="jmodal"> <div class="jmodal-content"> <span class="close">&times;</span> <h3 id="repo">user/repo</h3> <div id="editor"></div> </div> </div>';

  const displayEditor = (paths) => {
    const map = new Map();
    const visited = new Set();
    for (const { path } of paths) {
      const key = path.substring(0, path.lastIndexOf('/'));
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(path);
    }
    const editor = [];
    dfs(editor, map, visited, '');
    document.getElementById('repo').innerHTML = userAndRepo;
    document.getElementById('editor').innerHTML = editor.join('');
  };

  const dfs = (editor, map, visited, jfolder) => {
    visited.add(jfolder);
    addjfolderOpen(editor, jfolder);
    const jfiles = map.get(jfolder);
    for (const jfile of jfiles) {
      if (visited.has(jfile)) continue;
      if (map.has(jfile)) dfs(editor, map, visited, jfile);
      else addjfile(editor, jfile);
    }
    addFolerClose(editor);
  };

  const addjfolderOpen = (editor, jfolder) => {
    const jfolderName = jfolder.substring(jfolder.lastIndexOf('/') + 1);
    editor.push(
      `<div class="jjfoldercontainer"><span class="jfolder i-jfolder-o" data-isexpanded="true">${jfolderName}</span>`
    );
  };

  const addFolerClose = (editor) => editor.push('</div>');

  const addjfile = (editor, jfile) => {
    const jfileName = jfile.substring(jfile.lastIndexOf('/') + 1);
    editor.push(
      `<a class="jfile i-jfile-code-o" href='${repoUrl}/blob/${branch}/${jfile}'>${jfileName}</a>`
    );
  };

  document.getElementById('editor').addEventListener('click', (event) => {
    const elem = event.target;
    if (isValidjfolder(event, elem)) {
      const isexpanded = elem.dataset.isexpanded === 'true';
      if (isexpanded) {
        elem.classList.remove('i-jfolder-o');
        elem.classList.add('i-jfolder');
      } else {
        elem.classList.remove('i-jfolder');
        elem.classList.add('i-jfolder-o');
      }
      elem.dataset.isexpanded = !isexpanded;
      for (const elemChild of [...elem.parentElement.children]) {
        for (const className of elemChild.classList) {
          if (className === 'jfile' || className === 'jjfoldercontainer')
            elemChild.style.display = isexpanded ? 'none' : 'block';
        }
      }
    }
  });

  const isValidjfolder = (event, elem) =>
    elem.tagName.toLowerCase() === 'span' &&
    elem !== event.currentTarget &&
    elem.classList.contains('jfolder');

  var jmodal = document.getElementById('myjmodal');
  var span = document.getElementsByClassName('close')[0];
  span.onclick = () => (jmodal.style.display = 'none');
  window.onclick = (event) => {
    if (event.target == jmodal) jmodal.style.display = 'none';
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
    displayEditor(raw.tree);
  } else {
    fetch(
      `https://api.github.com/repos/${userAndRepo}/git/trees/${branch}?recursive=1`
    )
      .then((response) => response.json())
      .then((data) => displayEditor(data.tree));
  }
})();
