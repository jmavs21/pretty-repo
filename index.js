javascript: (() => {
  const fileref = document.createElement('link');
  fileref.setAttribute('rel', 'stylesheet');
  fileref.setAttribute('type', 'text/css');
  fileref.setAttribute('href', 'https://use.fontawesome.com/f9d7def6f0.js');

  document.body.innerHTML =
    '<div id="myModal" class="modal"> <div class="modal-content"> <span class="close">&times;</span> <h3 id="repo">user/repo</h3> <div id="editor"></div> </div> </div>';
  const style = document.createElement('style');
  style.innerHTML =
    '#editor { padding-bottom: 35%; } #editor, #repo { width: fit-content; font-family: FontAwesome; } .foldercontainer, .file { display: block; padding: 5px 2px 1px 10px; /* top, right, bottom, left*/ } .folder { color: black; } .file { color: black; } .folder, .file { cursor: pointer; } .folder:hover, .file:hover { background: #00ffff; } .folder:before, .file:before { padding-right: 5px; } a { text-decoration: none; } .modal { /* display: none; */ /* Hidden by default */ position: fixed; /* Stay in place */ z-index: 1; /* Sit on top */ padding-top: 100px; /* Location of the box */ left: 0; top: 0; width: 100%; /* Full width */ height: 100%; /* Full height */ overflow: auto; /* Enable scroll if needed */ background-color: rgb(0, 0, 0); /* Fallback color */ background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */ } .modal-content { background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: fit-content; } .close { color: #aaaaaa; float: right; font-size: 25px; font-weight: bold; } .close:hover, .close:focus { color: #000; text-decoration: none; cursor: pointer; }';
  const ref = document.querySelector('link');
  document.querySelector('link');
  ref.parentNode.insertBefore(style, ref);

  const repoUrl = 'https://github.com/jmavs21/posts'; // window.location.href;
  const userAndRepo = repoUrl.substring(19);
  const branch = 'master'; // document.querySelector('#branch-select-menu').querySelector('.css-truncate-target').innerHTML;

  console.log('repoUrl:', repoUrl);
  console.log('userAndRepo:', userAndRepo);
  console.log('branch:', branch);

  // fetch(
  //   `https://api.github.com/repos/${userAndRepo}/git/trees/${branch}?recursive=1`
  // )
  //   .then((response) => response.json())
  //   .then((data) => displayEditor(data.tree));

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

  const dfs = (editor, map, visited, folder) => {
    visited.add(folder);
    addFolderOpen(editor, folder);
    const files = map.get(folder);
    for (const file of files) {
      if (visited.has(file)) continue;
      if (map.has(file)) dfs(editor, map, visited, file);
      else addFile(editor, file);
    }
    addFolerClose(editor);
  };

  const addFolderOpen = (editor, folder) => {
    const folderName = folder.substring(folder.lastIndexOf('/') + 1);
    editor.push(
      `<div class="foldercontainer"><span class="folder fa-folder-o" data-isexpanded="true">${folderName}</span>`
    );
  };

  const addFolerClose = (editor) => editor.push('</div>');

  const addFile = (editor, file) => {
    const fileName = file.substring(file.lastIndexOf('/') + 1);
    editor.push(
      `<a class="file fa-file-code-o" href='${repoUrl}/blob/${branch}/${file}'>${fileName}</a>`
    );
  };

  document.getElementById('editor').addEventListener('click', (event) => {
    const elem = event.target;
    if (isValidFolder(event, elem)) {
      const isexpanded = elem.dataset.isexpanded === 'true';
      if (isexpanded) {
        elem.classList.remove('fa-folder-o');
        elem.classList.add('fa-folder');
      } else {
        elem.classList.remove('fa-folder');
        elem.classList.add('fa-folder-o');
      }
      elem.dataset.isexpanded = !isexpanded;
      for (const elemChild of [...elem.parentElement.children]) {
        for (const className of elemChild.classList) {
          if (className === 'file' || className === 'foldercontainer')
            elemChild.style.display = isexpanded ? 'none' : 'block';
        }
      }
    }
  });

  const isValidFolder = (event, elem) =>
    elem.tagName.toLowerCase() === 'span' &&
    elem !== event.currentTarget &&
    elem.classList.contains('folder');

  const raw = {
    sha: '1523d85902c81c81032d220d07644ebdb84d2eb1',
    url:
      'https://api.github.com/repos/jmavs21/posts/git/trees/1523d85902c81c81032d220d07644ebdb84d2eb1',
    tree: [
      {
        path: '.DS_Store',
        mode: '100644',
        type: 'blob',
        sha: '8f170bd1754dd632ffa4d99f17976d916a615899',
        size: 6148,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/8f170bd1754dd632ffa4d99f17976d916a615899',
      },
      {
        path: '.gitignore',
        mode: '100644',
        type: 'blob',
        sha: 'e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf',
        size: 10,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/e43b0f988953ae3a84b00331d0ccf5f7d51cb3cf',
      },
      {
        path: 'LICENSE',
        mode: '100644',
        type: 'blob',
        sha: '8d2df304626561e7bc04de9935fd1d8800dff2cd',
        size: 1064,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/8d2df304626561e7bc04de9935fd1d8800dff2cd',
      },
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
        path: 'api/.gitignore',
        mode: '100644',
        type: 'blob',
        sha: 'acffe4c1ce44a9ca91169128b5679d950069aaf3',
        size: 408,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/acffe4c1ce44a9ca91169128b5679d950069aaf3',
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
        path: 'api/build.gradle.kts',
        mode: '100644',
        type: 'blob',
        sha: '40894cfbfec4bd8a34df21a4dbc8bd7dfecec81b',
        size: 2166,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/40894cfbfec4bd8a34df21a4dbc8bd7dfecec81b',
      },
      {
        path: 'api/cleanarchitecture.png',
        mode: '100644',
        type: 'blob',
        sha: '54a1d2b15f4d50f1d1e3b42004420d6f478e9d87',
        size: 148811,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/54a1d2b15f4d50f1d1e3b42004420d6f478e9d87',
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

  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
})();
