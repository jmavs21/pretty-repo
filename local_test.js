javascript: (() => {
  const repoUrl =
    'https://github.com/jmavs21/posts'; /* window.location.href; */
  const userAndRepo = repoUrl.substring(19);
  const branch =
    'master'; /* document.querySelector('#branch-select-menu').querySelector('.css-truncate-target').innerHTML; */
  console.log('repoUrl:', repoUrl);
  console.log('userAndRepo:', userAndRepo);
  console.log('branch:', branch);

  const cssStyle = document.createElement('style');
  cssStyle.innerHTML =
    "#editor { padding-bottom: 35%; } #editor, #repo { width: fit-content; font-family: 'Courier New', Courier, monospace; } .jjfoldercontainer, .jfile { display: block; padding: 5px 2px 1px 10px; } .jfolder { color: black; } .jfile { color: black; } .jfolder, .jfile { cursor: pointer; } .jfolder:hover, .jfile:hover { background: #00ffff; } .jfolder:before, .jfile:before { padding-right: 10px; } a { text-decoration: none; } .i-jfolder:before { content: '\\1F4C1'; } .i-jfolder-o:before { content: '\\1F4C2'; } .i-jfile-code-o:before { content: '\\1F4C4'; } .jmodal { position: fixed; z-index: 1; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4); } .jmodal-content { background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: fit-content; } .close { color: #aaaaaa; float: right; font-size: 25px; font-weight: bold; } .close:hover, .close:focus { color: #000; text-decoration: none; cursor: pointer; }";
  document.head.appendChild(cssStyle);

  document.body.innerHTML =
    '<div id="myjmodal" class="jmodal"> <div class="jmodal-content"> <span class="close">&times;</span> <h3 id="repo">user/repo</h3> <div id="editor"></div> </div> </div>';

  /* fetch(
    `https://api.github.com/repos/${userAndRepo}/git/trees/${branch}?recursive=1`
  )
    .then((response) => response.json())
    .then((data) => displayEditor(data.tree)); */

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
    sha: '1523d85902c81c81032d220d07644ebdb84d2eb1',
    url:
      'https://api.github.com/repos/jmavs21/posts/git/trees/1523d85902c81c81032d220d07644ebdb84d2eb1',
    tree: [
      {
        path: 'README.md',
        mode: '100644',
        type: 'blob',
        sha: '28ca582151c4e9796254508f0b21a6b3b4bb08c9',
        size: 807,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/28ca582151c4e9796254508f0b21a6b3b4bb08c9',
      },
      {
        path: 'api',
        mode: '040000',
        type: 'tree',
        sha: '9141ace02ba9a930dc4f35a1b5f91384bc337f08',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/9141ace02ba9a930dc4f35a1b5f91384bc337f08',
      },
      {
        path: 'api/README.md',
        mode: '100644',
        type: 'blob',
        sha: '4a9e1c59af39d448e5b79d69d2c51c811ded23b6',
        size: 472,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/4a9e1c59af39d448e5b79d69d2c51c811ded23b6',
      },
      {
        path: 'api/gradle',
        mode: '040000',
        type: 'tree',
        sha: '2fb5d86589f2f7d6bc3d1e0eb0771b24807f37b3',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/2fb5d86589f2f7d6bc3d1e0eb0771b24807f37b3',
      },
      {
        path: 'api/gradle/wrapper',
        mode: '040000',
        type: 'tree',
        sha: '6ad47faedbb6f7fd6fdbba432490544c7960ace7',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/6ad47faedbb6f7fd6fdbba432490544c7960ace7',
      },
      {
        path: 'api/gradle/wrapper/gradle-wrapper.jar',
        mode: '100644',
        type: 'blob',
        sha: 'e708b1c023ec8b20f512888fe07c5bd3ff77bb8f',
        size: 59203,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/e708b1c023ec8b20f512888fe07c5bd3ff77bb8f',
      },
    ],
    truncated: false,
  };

  displayEditor(raw.tree);
})();
