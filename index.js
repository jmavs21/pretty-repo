javascript: (() => {
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
      {
        path: 'api/gradle/wrapper/gradle-wrapper.properties',
        mode: '100644',
        type: 'blob',
        sha: '12d38de6a487379bb3664c6ac06e21443d977e2e',
        size: 202,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/12d38de6a487379bb3664c6ac06e21443d977e2e',
      },
      {
        path: 'api/gradlew',
        mode: '100755',
        type: 'blob',
        sha: '4f906e0c811fc9e230eb44819f509cd0627f2600',
        size: 5766,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/4f906e0c811fc9e230eb44819f509cd0627f2600',
      },
      {
        path: 'api/gradlew.bat',
        mode: '100644',
        type: 'blob',
        sha: 'ac1b06f93825db68fb0c0b5150917f340eaa5d02',
        size: 2763,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/ac1b06f93825db68fb0c0b5150917f340eaa5d02',
      },
      {
        path: 'api/notes.txt',
        mode: '100644',
        type: 'blob',
        sha: '9c069dce210eac7636a7a3b00fdccb519bec876b',
        size: 81,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/9c069dce210eac7636a7a3b00fdccb519bec876b',
      },
      {
        path: 'api/packagebycomponent.png',
        mode: '100644',
        type: 'blob',
        sha: '19217dc6bdaef703da6aa72deaf3ba5ec23e9172',
        size: 50219,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/19217dc6bdaef703da6aa72deaf3ba5ec23e9172',
      },
      {
        path: 'api/settings.gradle.kts',
        mode: '100644',
        type: 'blob',
        sha: '07f69678869f01f11853336e451981dbd261050a',
        size: 368,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/07f69678869f01f11853336e451981dbd261050a',
      },
      {
        path: 'api/src',
        mode: '040000',
        type: 'tree',
        sha: '16ab90d326f98afe40b5ac6bb5ebeeff85f3559f',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/16ab90d326f98afe40b5ac6bb5ebeeff85f3559f',
      },
      {
        path: 'api/src/main',
        mode: '040000',
        type: 'tree',
        sha: 'fafdc88db3ab691499382289a1354f06a94546ce',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/fafdc88db3ab691499382289a1354f06a94546ce',
      },
      {
        path: 'api/src/main/kotlin',
        mode: '040000',
        type: 'tree',
        sha: 'db6a02d4ef1f2c991a04afdd3967ee749fa89915',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/db6a02d4ef1f2c991a04afdd3967ee749fa89915',
      },
      {
        path: 'api/src/main/kotlin/com',
        mode: '040000',
        type: 'tree',
        sha: 'd81f0f00cf0c2d556b724db5b83c3e5dec670481',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/d81f0f00cf0c2d556b724db5b83c3e5dec670481',
      },
      {
        path: 'api/src/main/kotlin/com/posts',
        mode: '040000',
        type: 'tree',
        sha: '33935f3d18f5358024cb28166928bce35cfc3373',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/33935f3d18f5358024cb28166928bce35cfc3373',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api',
        mode: '040000',
        type: 'tree',
        sha: '87df60459ec1bb1ca32fd1380786000016fcadd1',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/87df60459ec1bb1ca32fd1380786000016fcadd1',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/Main.kt',
        mode: '100644',
        type: 'blob',
        sha: '14d84589a0b3f2af7eac67db82e14fa7b8f870a5',
        size: 237,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/14d84589a0b3f2af7eac67db82e14fa7b8f870a5',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/conf',
        mode: '040000',
        type: 'tree',
        sha: '627c6e100274cba1622ce3ab5d97c055af372190',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/627c6e100274cba1622ce3ab5d97c055af372190',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/conf/CacheConfig.kt',
        mode: '100644',
        type: 'blob',
        sha: 'd13afb42cf2edc51eb115130ecec39ff76d1fced',
        size: 1604,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/d13afb42cf2edc51eb115130ecec39ff76d1fced',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/conf/JwtConfig.kt',
        mode: '100644',
        type: 'blob',
        sha: '9a4fd6cedd61285ecb6be4256c0febf7ab0721b9',
        size: 4037,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/9a4fd6cedd61285ecb6be4256c0febf7ab0721b9',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/conf/MessageQueueConfig.kt',
        mode: '100644',
        type: 'blob',
        sha: 'b26f7df87a54e84747b8a738bfb60b5571052c9a',
        size: 1758,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/b26f7df87a54e84747b8a738bfb60b5571052c9a',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/conf/SwaggerConfig.kt',
        mode: '100644',
        type: 'blob',
        sha: '307d6694b21fe1a2bd2ec75404808cd2584a90b5',
        size: 1016,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/307d6694b21fe1a2bd2ec75404808cd2584a90b5',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/conf/WebConfig.kt',
        mode: '100644',
        type: 'blob',
        sha: '2ee47a6f0b13373af1355dd81d73e5faf8238a97',
        size: 4265,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/2ee47a6f0b13373af1355dd81d73e5faf8238a97',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/error',
        mode: '040000',
        type: 'tree',
        sha: 'f491c3d3a2cb60796d427d3f15c82b7a52490f00',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/f491c3d3a2cb60796d427d3f15c82b7a52490f00',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/error/ErrorHandler.kt',
        mode: '100644',
        type: 'blob',
        sha: 'cce2687784a4ff6feb56d657720dd5cbf6e15c4c',
        size: 2817,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/cce2687784a4ff6feb56d657720dd5cbf6e15c4c',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/error/Exceptions.kt',
        mode: '100644',
        type: 'blob',
        sha: 'bf23c6bc8cfe1e36ea9d290f0af99f9c8cec5d86',
        size: 268,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/bf23c6bc8cfe1e36ea9d290f0af99f9c8cec5d86',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/follows',
        mode: '040000',
        type: 'tree',
        sha: '63d830d35f229ea44a72e46a9788e5caf24f627d',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/63d830d35f229ea44a72e46a9788e5caf24f627d',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/follows/Follow.kt',
        mode: '100644',
        type: 'blob',
        sha: '6cc1872353365cb8f7697828d438d8b15c6daf86',
        size: 625,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/6cc1872353365cb8f7697828d438d8b15c6daf86',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/follows/FollowRepo.kt',
        mode: '100644',
        type: 'blob',
        sha: '6ba9fc4d2e4a9ab2318d6ecd27f29095a32a2f70',
        size: 571,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/6ba9fc4d2e4a9ab2318d6ecd27f29095a32a2f70',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/follows/FollowService.kt',
        mode: '100644',
        type: 'blob',
        sha: '6e44e03ef2547d65078cdfa8c8895fc9fc7c30a4',
        size: 396,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/6e44e03ef2547d65078cdfa8c8895fc9fc7c30a4',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/follows/FollowServiceImpl.kt',
        mode: '100644',
        type: 'blob',
        sha: 'daf525a516288bcf981167c7755400219682a3e2',
        size: 1030,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/daf525a516288bcf981167c7755400219682a3e2',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/posts',
        mode: '040000',
        type: 'tree',
        sha: '96391e94c46a3186aaadec5532aed217a41cfbf1',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/96391e94c46a3186aaadec5532aed217a41cfbf1',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/posts/Post.kt',
        mode: '100644',
        type: 'blob',
        sha: 'ce441708c3da544e793a678c12d4e7334059c9ad',
        size: 892,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/ce441708c3da544e793a678c12d4e7334059c9ad',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/posts/PostRepo.kt',
        mode: '100644',
        type: 'blob',
        sha: '6b8beb83915683a6bd637c12553a903f6f52092d',
        size: 1138,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/6b8beb83915683a6bd637c12553a903f6f52092d',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/posts/PostService.kt',
        mode: '100644',
        type: 'blob',
        sha: 'faeda173948a4dfab98c0768483a3abbb1f3ab8a',
        size: 343,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/faeda173948a4dfab98c0768483a3abbb1f3ab8a',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/posts/PostServiceImpl.kt',
        mode: '100644',
        type: 'blob',
        sha: '2c4600b56b4d505b6c0ddfd890cde4c315719470',
        size: 1838,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/2c4600b56b4d505b6c0ddfd890cde4c315719470',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/users',
        mode: '040000',
        type: 'tree',
        sha: '569b3a3fbd0f3407ccf5f9a5788dce1f41f7800b',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/569b3a3fbd0f3407ccf5f9a5788dce1f41f7800b',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/users/User.kt',
        mode: '100644',
        type: 'blob',
        sha: '9d1814e64fc13a9ab9313448194cda007289735d',
        size: 1286,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/9d1814e64fc13a9ab9313448194cda007289735d',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/users/UserRepo.kt',
        mode: '100644',
        type: 'blob',
        sha: '4e8897d74261fb6f8d98f784f4e9abd00b75e3cf',
        size: 192,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/4e8897d74261fb6f8d98f784f4e9abd00b75e3cf',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/users/UserService.kt',
        mode: '100644',
        type: 'blob',
        sha: '457a0e9981ab635fac287eb74c307c7ec714a0b5',
        size: 342,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/457a0e9981ab635fac287eb74c307c7ec714a0b5',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/users/UserServiceImpl.kt',
        mode: '100644',
        type: 'blob',
        sha: '2a1d28e348132019fddf294a2f4188daf984a10c',
        size: 2193,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/2a1d28e348132019fddf294a2f4188daf984a10c',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/users/cache',
        mode: '040000',
        type: 'tree',
        sha: '6f6c8065dc6eb45c501c5c6569a5fc2cabeead2e',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/6f6c8065dc6eb45c501c5c6569a5fc2cabeead2e',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/users/cache/UserCache.kt',
        mode: '100644',
        type: 'blob',
        sha: '21878f27173a14560b65e719784c9ecd3fea9498',
        size: 252,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/21878f27173a14560b65e719784c9ecd3fea9498',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/users/cache/UserCacheRepo.kt',
        mode: '100644',
        type: 'blob',
        sha: '160224f848bf7511a8b75c80a8b4597b61286e5a',
        size: 162,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/160224f848bf7511a8b75c80a8b4597b61286e5a',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/votes',
        mode: '040000',
        type: 'tree',
        sha: 'a4e8ac3201d7a1a4a1ac8cdeba2a21c1389c4e97',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/a4e8ac3201d7a1a4a1ac8cdeba2a21c1389c4e97',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/votes/Vote.kt',
        mode: '100644',
        type: 'blob',
        sha: '1a7bba3d624dba61178d3cafd21a5607cbc214cd',
        size: 706,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/1a7bba3d624dba61178d3cafd21a5607cbc214cd',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/votes/VoteRepo.kt',
        mode: '100644',
        type: 'blob',
        sha: 'c849e95edea5b88276d2f3dec1172d2aa44be316',
        size: 199,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/c849e95edea5b88276d2f3dec1172d2aa44be316',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/votes/VoteService.kt',
        mode: '100644',
        type: 'blob',
        sha: '62d5ff500903ba2115278c2ab1707fd3f5c456d5',
        size: 275,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/62d5ff500903ba2115278c2ab1707fd3f5c456d5',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/votes/VoteServiceImpl.kt',
        mode: '100644',
        type: 'blob',
        sha: '38e59f69e49505a5e907e88a08f2538b7c95e8c3',
        size: 1030,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/38e59f69e49505a5e907e88a08f2538b7c95e8c3',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/web',
        mode: '040000',
        type: 'tree',
        sha: '7cfe387b5728486368360c0baf04d48132a20ad9',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/7cfe387b5728486368360c0baf04d48132a20ad9',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/web/Controllers.kt',
        mode: '100644',
        type: 'blob',
        sha: 'deddf39ac15cd0b82a5b21d41e5c081aa3b26daa',
        size: 7817,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/deddf39ac15cd0b82a5b21d41e5c081aa3b26daa',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/web/Dtos.kt',
        mode: '100644',
        type: 'blob',
        sha: 'dacc7adcaa298e172908780b21e27e5a9cdde43b',
        size: 2531,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/dacc7adcaa298e172908780b21e27e5a9cdde43b',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/web/sse',
        mode: '040000',
        type: 'tree',
        sha: '7887ad406c479576964add62bfa90562bbcdf999',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/7887ad406c479576964add62bfa90562bbcdf999',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/web/sse/FeedSse.kt',
        mode: '100644',
        type: 'blob',
        sha: '3742dfe299e53b83800de530fe3bbae29a50a212',
        size: 271,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/3742dfe299e53b83800de530fe3bbae29a50a212',
      },
      {
        path: 'api/src/main/kotlin/com/posts/api/web/sse/FeedSseImpl.kt',
        mode: '100644',
        type: 'blob',
        sha: '6eafc48962337e538f8443fa2f025191405b13b1',
        size: 1040,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/6eafc48962337e538f8443fa2f025191405b13b1',
      },
      {
        path: 'api/src/main/resources',
        mode: '040000',
        type: 'tree',
        sha: '5f7ce119e6a83cc9a49bc26f1f97bb89f2ab5eb9',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/5f7ce119e6a83cc9a49bc26f1f97bb89f2ab5eb9',
      },
      {
        path: 'api/src/main/resources/application.properties',
        mode: '100644',
        type: 'blob',
        sha: '1df0c05134c899cf0d3c7234a87ff91354b926df',
        size: 1105,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/1df0c05134c899cf0d3c7234a87ff91354b926df',
      },
      {
        path: 'api/src/main/resources/data.sql',
        mode: '100644',
        type: 'blob',
        sha: '291311312811067c4f319898777e715cc89e81ef',
        size: 62939,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/291311312811067c4f319898777e715cc89e81ef',
      },
      {
        path: 'api/src/test',
        mode: '040000',
        type: 'tree',
        sha: 'bd21cc202891cdfec2958c08f71783fc2fb02c38',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/bd21cc202891cdfec2958c08f71783fc2fb02c38',
      },
      {
        path: 'api/src/test/kotlin',
        mode: '040000',
        type: 'tree',
        sha: 'b5abb0ad3dd8731eb39105aa878ac2bd1cd7c8f8',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/b5abb0ad3dd8731eb39105aa878ac2bd1cd7c8f8',
      },
      {
        path: 'api/src/test/kotlin/com',
        mode: '040000',
        type: 'tree',
        sha: 'd1a22e8e80b1b2997575fd61b5e543f7b1c0d13e',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/d1a22e8e80b1b2997575fd61b5e543f7b1c0d13e',
      },
      {
        path: 'api/src/test/kotlin/com/posts',
        mode: '040000',
        type: 'tree',
        sha: 'b03c3d3a4f55285385eb2d93a170932d804857bf',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/b03c3d3a4f55285385eb2d93a170932d804857bf',
      },
      {
        path: 'api/src/test/kotlin/com/posts/api',
        mode: '040000',
        type: 'tree',
        sha: 'fb1e12d93d1bcdb5dcf6c4e96ee3b4bf7b41a179',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/fb1e12d93d1bcdb5dcf6c4e96ee3b4bf7b41a179',
      },
      {
        path: 'api/src/test/kotlin/com/posts/api/ControllersTest.kt',
        mode: '100644',
        type: 'blob',
        sha: '46879cef504b7338dbd0c43b9171037c49da51aa',
        size: 20081,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/46879cef504b7338dbd0c43b9171037c49da51aa',
      },
      {
        path: 'api/src/test/kotlin/com/posts/api/SpringContextTest.kt',
        mode: '100644',
        type: 'blob',
        sha: '97079fc5b2766def1edd258737af7c975c5abc05',
        size: 214,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/97079fc5b2766def1edd258737af7c975c5abc05',
      },
      {
        path: 'api/src/test/kotlin/com/posts/api/util',
        mode: '040000',
        type: 'tree',
        sha: 'f31e42c00f8f3b87fe7eed749654373f599023be',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/f31e42c00f8f3b87fe7eed749654373f599023be',
      },
      {
        path: 'api/src/test/kotlin/com/posts/api/util/CheckUtil.kt',
        mode: '100644',
        type: 'blob',
        sha: '141836f9bf985b67a45b74cec8496681c1ce065c',
        size: 1202,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/141836f9bf985b67a45b74cec8496681c1ce065c',
      },
      {
        path: 'api/src/test/resources',
        mode: '040000',
        type: 'tree',
        sha: '222b7a21ab35eec4d07effea60585c73e74d112e',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/222b7a21ab35eec4d07effea60585c73e74d112e',
      },
      {
        path: 'api/src/test/resources/junit-platform.properties',
        mode: '100644',
        type: 'blob',
        sha: 'e6d55f8bd91084826a220b4e63345c7fa598c52f',
        size: 56,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/e6d55f8bd91084826a220b4e63345c7fa598c52f',
      },
      {
        path: 'example.gif',
        mode: '100644',
        type: 'blob',
        sha: '1a77d14ae864092e449236cb32fbffd4663796f8',
        size: 5386428,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/1a77d14ae864092e449236cb32fbffd4663796f8',
      },
      {
        path: 'web',
        mode: '040000',
        type: 'tree',
        sha: 'd9d70b25647b112e0ded4d62c84a01750ac15146',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/d9d70b25647b112e0ded4d62c84a01750ac15146',
      },
      {
        path: 'web/.env',
        mode: '100644',
        type: 'blob',
        sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        size: 0,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
      },
      {
        path: 'web/.env.development',
        mode: '100644',
        type: 'blob',
        sha: '7746d119300759da52e0e7c49229a9c1228e1b4c',
        size: 43,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/7746d119300759da52e0e7c49229a9c1228e1b4c',
      },
      {
        path: 'web/.env.production',
        mode: '100644',
        type: 'blob',
        sha: 'ee84bb1ffafef6e775b2459ddabe12a6453e7268',
        size: 64,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/ee84bb1ffafef6e775b2459ddabe12a6453e7268',
      },
      {
        path: 'web/.gitignore',
        mode: '100644',
        type: 'blob',
        sha: '4d29575de80483b005c29bfcac5061cd2f45313e',
        size: 310,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/4d29575de80483b005c29bfcac5061cd2f45313e',
      },
      {
        path: 'web/README.md',
        mode: '100644',
        type: 'blob',
        sha: '2a13e9bad152df12b2487a5503061593d03eb4ce',
        size: 521,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/2a13e9bad152df12b2487a5503061593d03eb4ce',
      },
      {
        path: 'web/cypress.json',
        mode: '100644',
        type: 'blob',
        sha: '6b944342ec5314e1003e68882a736b3eba549fa1',
        size: 602,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/6b944342ec5314e1003e68882a736b3eba549fa1',
      },
      {
        path: 'web/cypress',
        mode: '040000',
        type: 'tree',
        sha: '0dfa48438b2b8bd45964153c783030e93b85d88a',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/0dfa48438b2b8bd45964153c783030e93b85d88a',
      },
      {
        path: 'web/cypress/.eslintrc.json',
        mode: '100644',
        type: 'blob',
        sha: 'b677df5693ba7b08e8034c22a6744cbe759a2801',
        size: 55,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/b677df5693ba7b08e8034c22a6744cbe759a2801',
      },
      {
        path: 'web/cypress/fixtures',
        mode: '040000',
        type: 'tree',
        sha: '12aa06eac8929869285f81792fc150c867108658',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/12aa06eac8929869285f81792fc150c867108658',
      },
      {
        path: 'web/cypress/fixtures/post.json',
        mode: '100644',
        type: 'blob',
        sha: '73c492cd9ecabae63aeb16a7841332ba0157910e',
        size: 56,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/73c492cd9ecabae63aeb16a7841332ba0157910e',
      },
      {
        path: 'web/cypress/integration',
        mode: '040000',
        type: 'tree',
        sha: '5c547a9ec7723cab6e3ef03f56dcd86380db4e88',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/5c547a9ec7723cab6e3ef03f56dcd86380db4e88',
      },
      {
        path: 'web/cypress/integration/follows',
        mode: '040000',
        type: 'tree',
        sha: '374ea559e7edc0d69e3eb8fe6e3a722a48423714',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/374ea559e7edc0d69e3eb8fe6e3a722a48423714',
      },
      {
        path: 'web/cypress/integration/follows/follows_spec.js',
        mode: '100644',
        type: 'blob',
        sha: 'acdf80025fbc4766518ac4437a97bcd0b2522281',
        size: 1423,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/acdf80025fbc4766518ac4437a97bcd0b2522281',
      },
      {
        path: 'web/cypress/integration/notifications',
        mode: '040000',
        type: 'tree',
        sha: 'a85030f8fecfdab546e7140b9fcb5f0cbaa99720',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/a85030f8fecfdab546e7140b9fcb5f0cbaa99720',
      },
      {
        path: 'web/cypress/integration/notifications/feed_notification_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '928930733450e74fdd081ce25918489080fac2ba',
        size: 918,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/928930733450e74fdd081ce25918489080fac2ba',
      },
      {
        path: 'web/cypress/integration/other',
        mode: '040000',
        type: 'tree',
        sha: '1719e062d70b03e0ba496b3a10adb93a18611360',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/1719e062d70b03e0ba496b3a10adb93a18611360',
      },
      {
        path: 'web/cypress/integration/other/disabled_features_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '309aec82944d4c6921b341296e53d97bf4a8b876',
        size: 336,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/309aec82944d4c6921b341296e53d97bf4a8b876',
      },
      {
        path: 'web/cypress/integration/other/go_home_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '43e49e110a5fb97e5b632cb5f2744b8a4a4ae86d',
        size: 253,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/43e49e110a5fb97e5b632cb5f2744b8a4a4ae86d',
      },
      {
        path: 'web/cypress/integration/other/light_dark_mode_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '56b74bbeee200c789693daec36cd63821cda936f',
        size: 592,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/56b74bbeee200c789693daec36cd63821cda936f',
      },
      {
        path: 'web/cypress/integration/other/not_found_page_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '2112d91be7386a146b068ec6a15e55a901b67342',
        size: 168,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/2112d91be7386a146b068ec6a15e55a901b67342',
      },
      {
        path: 'web/cypress/integration/other/offline_mode_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '36b69d76bf56d625c0399cc87ef3e15df45ad820',
        size: 1895,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/36b69d76bf56d625c0399cc87ef3e15df45ad820',
      },
      {
        path: 'web/cypress/integration/other/protected_route_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '44d65a1c6041d578c3789fef38e5f830b78885d1',
        size: 459,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/44d65a1c6041d578c3789fef38e5f830b78885d1',
      },
      {
        path: 'web/cypress/integration/other/viewport_spec.js',
        mode: '100644',
        type: 'blob',
        sha: 'bdbeaa5a85ab02ce10661510fe58c874b2368539',
        size: 261,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/bdbeaa5a85ab02ce10661510fe58c874b2368539',
      },
      {
        path: 'web/cypress/integration/posts',
        mode: '040000',
        type: 'tree',
        sha: '2cc8354cb7b8080bb937c85e6acd1f90498bb982',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/2cc8354cb7b8080bb937c85e6acd1f90498bb982',
      },
      {
        path: 'web/cypress/integration/posts/crud_post_spec.js',
        mode: '100644',
        type: 'blob',
        sha: 'd5a337e67350663d3d3f7584902c0400f5cf27cf',
        size: 2319,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/d5a337e67350663d3d3f7584902c0400f5cf27cf',
      },
      {
        path: 'web/cypress/integration/posts/load_more_posts_spec.js',
        mode: '100644',
        type: 'blob',
        sha: 'b68362c841aaa6a5c83a85d84b1eb079ca9fbf8d',
        size: 937,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/b68362c841aaa6a5c83a85d84b1eb079ca9fbf8d',
      },
      {
        path: 'web/cypress/integration/posts/search_post_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '3c48d04df1030ffc6e2010308f96b0fc8f4a4ad2',
        size: 899,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/3c48d04df1030ffc6e2010308f96b0fc8f4a4ad2',
      },
      {
        path: 'web/cypress/integration/users',
        mode: '040000',
        type: 'tree',
        sha: '630a463bfb5560f266059b74e4982f24480b5aa0',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/630a463bfb5560f266059b74e4982f24480b5aa0',
      },
      {
        path: 'web/cypress/integration/users/login_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '57fd733d1bfbd860d7aad1fc61ca8fa79cd8464c',
        size: 1268,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/57fd733d1bfbd860d7aad1fc61ca8fa79cd8464c',
      },
      {
        path: 'web/cypress/integration/users/profile_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '0ff7d04cdf37a1a229a25b03c74f56191ea72c94',
        size: 882,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/0ff7d04cdf37a1a229a25b03c74f56191ea72c94',
      },
      {
        path: 'web/cypress/integration/users/register_spec.js',
        mode: '100644',
        type: 'blob',
        sha: 'b94009c846ae0c2ccb64b9ad57b061cb7d2f00a4',
        size: 2243,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/b94009c846ae0c2ccb64b9ad57b061cb7d2f00a4',
      },
      {
        path: 'web/cypress/integration/votes',
        mode: '040000',
        type: 'tree',
        sha: '773c96c92f6307e61de992780270293297cf6641',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/773c96c92f6307e61de992780270293297cf6641',
      },
      {
        path: 'web/cypress/integration/votes/votes_spec.js',
        mode: '100644',
        type: 'blob',
        sha: '92376cc1d6661a1ff08499c03a40fe49eee61fcc',
        size: 675,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/92376cc1d6661a1ff08499c03a40fe49eee61fcc',
      },
      {
        path: 'web/cypress/plugins',
        mode: '040000',
        type: 'tree',
        sha: 'db4735543718c5337d42cdf7e7d7a1b328c78575',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/db4735543718c5337d42cdf7e7d7a1b328c78575',
      },
      {
        path: 'web/cypress/plugins/index.js',
        mode: '100644',
        type: 'blob',
        sha: 'aa9918d2153059ab3d866dba7b2f4e39e6d24d7c',
        size: 718,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/aa9918d2153059ab3d866dba7b2f4e39e6d24d7c',
      },
      {
        path: 'web/cypress/support',
        mode: '040000',
        type: 'tree',
        sha: 'e20419c0a760de29354c16f1cb45ebe0153824b4',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/e20419c0a760de29354c16f1cb45ebe0153824b4',
      },
      {
        path: 'web/cypress/support/commands.js',
        mode: '100644',
        type: 'blob',
        sha: '110fcfce7bc23b6d07339cbcf334ece6e5816d4a',
        size: 224,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/110fcfce7bc23b6d07339cbcf334ece6e5816d4a',
      },
      {
        path: 'web/cypress/support/index.js',
        mode: '100644',
        type: 'blob',
        sha: '37a498fb5bf39577a1ce77921251f2c2c296e13d',
        size: 671,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/37a498fb5bf39577a1ce77921251f2c2c296e13d',
      },
      {
        path: 'web/cypress/tsconfig.json',
        mode: '100644',
        type: 'blob',
        sha: '92a7873e46c313afee56e886134c1cad22352bd3',
        size: 121,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/92a7873e46c313afee56e886134c1cad22352bd3',
      },
      {
        path: 'web/notes.txt',
        mode: '100644',
        type: 'blob',
        sha: '56c2d2b777923156e80de9fa7c731ff6be0b2823',
        size: 3160,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/56c2d2b777923156e80de9fa7c731ff6be0b2823',
      },
      {
        path: 'web/package-lock.json',
        mode: '100644',
        type: 'blob',
        sha: 'fa9101f0abdfcdca85fefa3ecbea72c38f468a44',
        size: 643980,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/fa9101f0abdfcdca85fefa3ecbea72c38f468a44',
      },
      {
        path: 'web/package.json',
        mode: '100644',
        type: 'blob',
        sha: 'b3c1ac9b3a9fe5fe2061c5ec2a013ac85398ced3',
        size: 1492,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/b3c1ac9b3a9fe5fe2061c5ec2a013ac85398ced3',
      },
      {
        path: 'web/public',
        mode: '040000',
        type: 'tree',
        sha: '695c717a26a4070da70b129aceda8da489c14919',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/695c717a26a4070da70b129aceda8da489c14919',
      },
      {
        path: 'web/public/favicon.ico',
        mode: '100644',
        type: 'blob',
        sha: 'fcb5d35b431cbf903b553e192cd8cc2f467ce3a7',
        size: 15086,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/fcb5d35b431cbf903b553e192cd8cc2f467ce3a7',
      },
      {
        path: 'web/public/index.html',
        mode: '100644',
        type: 'blob',
        sha: '7d1ce5b3054454afb873afae023bcf5ae88edbbb',
        size: 1677,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/7d1ce5b3054454afb873afae023bcf5ae88edbbb',
      },
      {
        path: 'web/public/logo192.png',
        mode: '100644',
        type: 'blob',
        sha: 'b3816bfc7e1671f1696b643260d72023aa56ff8a',
        size: 3628,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/b3816bfc7e1671f1696b643260d72023aa56ff8a',
      },
      {
        path: 'web/public/logo512.png',
        mode: '100644',
        type: 'blob',
        sha: 'c2f08e1a68ec96b71fd2fc36e0b18ff26a7c0a23',
        size: 5138,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/c2f08e1a68ec96b71fd2fc36e0b18ff26a7c0a23',
      },
      {
        path: 'web/public/manifest.json',
        mode: '100644',
        type: 'blob',
        sha: 'c55a921677d9e5456257f1c5773001720a992147',
        size: 481,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/c55a921677d9e5456257f1c5773001720a992147',
      },
      {
        path: 'web/public/robots.txt',
        mode: '100644',
        type: 'blob',
        sha: 'e9e57dc4d41b9b46e05112e9f45b7ea6ac0ba15e',
        size: 67,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/e9e57dc4d41b9b46e05112e9f45b7ea6ac0ba15e',
      },
      {
        path: 'web/src',
        mode: '040000',
        type: 'tree',
        sha: '800f43ba9ab84f1a303ff77685dd9376e0d252dc',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/800f43ba9ab84f1a303ff77685dd9376e0d252dc',
      },
      {
        path: 'web/src/App.test.tsx',
        mode: '100644',
        type: 'blob',
        sha: '4db7ebc25c2d066cd254805af5dda1ed1d2bc819',
        size: 280,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/4db7ebc25c2d066cd254805af5dda1ed1d2bc819',
      },
      {
        path: 'web/src/App.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'f78ba7e498fcaaa9cc4712c6c46505c8ff5dd446',
        size: 2029,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/f78ba7e498fcaaa9cc4712c6c46505c8ff5dd446',
      },
      {
        path: 'web/src/components',
        mode: '040000',
        type: 'tree',
        sha: '4f1d6acfe6fc0a2e823c7446983a567480312f86',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/4f1d6acfe6fc0a2e823c7446983a567480312f86',
      },
      {
        path: 'web/src/components/Follow.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'e70753cfe2e6e2801d5f463573b8858e783bf3a6',
        size: 1201,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/e70753cfe2e6e2801d5f463573b8858e783bf3a6',
      },
      {
        path: 'web/src/components/InputField.tsx',
        mode: '100644',
        type: 'blob',
        sha: '45d1772a18c80f7b0c85c087d4d7adbf0e37dfa5',
        size: 870,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/45d1772a18c80f7b0c85c087d4d7adbf0e37dfa5',
      },
      {
        path: 'web/src/components/LoadingProgress.tsx',
        mode: '100644',
        type: 'blob',
        sha: '33cd9b347f611e0005435d1a331a6002a5d612cb',
        size: 291,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/33cd9b347f611e0005435d1a331a6002a5d612cb',
      },
      {
        path: 'web/src/components/NavBar.tsx',
        mode: '100644',
        type: 'blob',
        sha: '00d75b4ee7d9a7a9bcbb72539c7b42ca7c014443',
        size: 3429,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/00d75b4ee7d9a7a9bcbb72539c7b42ca7c014443',
      },
      {
        path: 'web/src/components/PostCard.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'd4caf57792c6c1a90d42f4e3cae7d2dd7bc9df0f',
        size: 1861,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/d4caf57792c6c1a90d42f4e3cae7d2dd7bc9df0f',
      },
      {
        path: 'web/src/components/ProtectedRoute.tsx',
        mode: '100644',
        type: 'blob',
        sha: '9908d1f16dda36b1ff1d74cbbee4e2d3374cff29',
        size: 707,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/9908d1f16dda36b1ff1d74cbbee4e2d3374cff29',
      },
      {
        path: 'web/src/components/SearchField.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'd3c24fa295073d265008f2b14d7e3902146e48e6',
        size: 828,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/d3c24fa295073d265008f2b14d7e3902146e48e6',
      },
      {
        path: 'web/src/components/Votes.tsx',
        mode: '100644',
        type: 'blob',
        sha: '6dca67379d7170f908d18e1d11f2e9f19526b8a5',
        size: 1639,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/6dca67379d7170f908d18e1d11f2e9f19526b8a5',
      },
      {
        path: 'web/src/components/Wrapper.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'e66d3e327ac5dd861426e3c1d525a918b498f4fb',
        size: 382,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/e66d3e327ac5dd861426e3c1d525a918b498f4fb',
      },
      {
        path: 'web/src/components/pages',
        mode: '040000',
        type: 'tree',
        sha: '61ffa03fa67bf51742fca1ebd95cbf672aa71f91',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/61ffa03fa67bf51742fca1ebd95cbf672aa71f91',
      },
      {
        path: 'web/src/components/pages/CreatePost.tsx',
        mode: '100644',
        type: 'blob',
        sha: '365d64290de3f4adf79ec2aeb05e9996ed5de92f',
        size: 1696,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/365d64290de3f4adf79ec2aeb05e9996ed5de92f',
      },
      {
        path: 'web/src/components/pages/Login.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'd0b024728d556c9f1bb8b965c94a6797a77cec11',
        size: 1828,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/d0b024728d556c9f1bb8b965c94a6797a77cec11',
      },
      {
        path: 'web/src/components/pages/Logout.tsx',
        mode: '100644',
        type: 'blob',
        sha: '2a030b77b500899c0135d78e0dd403890930a804',
        size: 236,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/2a030b77b500899c0135d78e0dd403890930a804',
      },
      {
        path: 'web/src/components/pages/NotFound.tsx',
        mode: '100644',
        type: 'blob',
        sha: '1d95fafb43e50e03c1a05294e41dfd4a5f4c696a',
        size: 324,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/1d95fafb43e50e03c1a05294e41dfd4a5f4c696a',
      },
      {
        path: 'web/src/components/pages/PostUpdate.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'fb0f3fdc9a82d435cef3071c426907351e0bbc52',
        size: 3515,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/fb0f3fdc9a82d435cef3071c426907351e0bbc52',
      },
      {
        path: 'web/src/components/pages/PostView.tsx',
        mode: '100644',
        type: 'blob',
        sha: '8848311be28e2e20d4976de9a4b38ebf5b8af34b',
        size: 1471,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/8848311be28e2e20d4976de9a4b38ebf5b8af34b',
      },
      {
        path: 'web/src/components/pages/Posts.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'b2696d0e57d2e86ae32064cebe3d5d39f9c5b454',
        size: 3183,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/b2696d0e57d2e86ae32064cebe3d5d39f9c5b454',
      },
      {
        path: 'web/src/components/pages/Profile.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'a695af43304a75b604d689676bd1966db0bd77a3',
        size: 3156,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/a695af43304a75b604d689676bd1966db0bd77a3',
      },
      {
        path: 'web/src/components/pages/Register.tsx',
        mode: '100644',
        type: 'blob',
        sha: 'de4e489901178653a4f1514fc65729b972bde09e',
        size: 1814,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/de4e489901178653a4f1514fc65729b972bde09e',
      },
      {
        path: 'web/src/index.tsx',
        mode: '100644',
        type: 'blob',
        sha: '890fc37d098200c9c4abe5ad1988105af980823e',
        size: 572,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/890fc37d098200c9c4abe5ad1988105af980823e',
      },
      {
        path: 'web/src/react-app-env.d.ts',
        mode: '100644',
        type: 'blob',
        sha: '6431bc5fc6b2c932dfe5d0418fc667b86c18b9fc',
        size: 40,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/6431bc5fc6b2c932dfe5d0418fc667b86c18b9fc',
      },
      {
        path: 'web/src/serviceWorker.ts',
        mode: '100644',
        type: 'blob',
        sha: 'b09523f155e978be34dfb9c743d27a90dbe4a141',
        size: 5295,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/b09523f155e978be34dfb9c743d27a90dbe4a141',
      },
      {
        path: 'web/src/services',
        mode: '040000',
        type: 'tree',
        sha: '42bc387c53a56632d5f1d11d01df809286514592',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/42bc387c53a56632d5f1d11d01df809286514592',
      },
      {
        path: 'web/src/services/authService.ts',
        mode: '100644',
        type: 'blob',
        sha: 'c90885489b16690cf50c5975bfd1f454e929108c',
        size: 1094,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/c90885489b16690cf50c5975bfd1f454e929108c',
      },
      {
        path: 'web/src/services/followService.ts',
        mode: '100644',
        type: 'blob',
        sha: '265f4d160a5627f29cea2997925ba0e9d274cef4',
        size: 1141,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/265f4d160a5627f29cea2997925ba0e9d274cef4',
      },
      {
        path: 'web/src/services/httpService.ts',
        mode: '100644',
        type: 'blob',
        sha: 'c92ad1bed573c59454287a0336852c1998d75273',
        size: 793,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/c92ad1bed573c59454287a0336852c1998d75273',
      },
      {
        path: 'web/src/services/logService.ts',
        mode: '100644',
        type: 'blob',
        sha: '25937e63f00cf638df59fb4745c334106bf0238d',
        size: 79,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/25937e63f00cf638df59fb4745c334106bf0238d',
      },
      {
        path: 'web/src/services/postService.ts',
        mode: '100644',
        type: 'blob',
        sha: 'fc29e94bcd64eb3c12a35d42b64eadcb7c598a78',
        size: 2257,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/fc29e94bcd64eb3c12a35d42b64eadcb7c598a78',
      },
      {
        path: 'web/src/services/userService.ts',
        mode: '100644',
        type: 'blob',
        sha: '282712b3a11c5ad331ae67db663a8f1db8387c52',
        size: 1204,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/282712b3a11c5ad331ae67db663a8f1db8387c52',
      },
      {
        path: 'web/src/services/voteService.ts',
        mode: '100644',
        type: 'blob',
        sha: 'aff4878917b3591a6656f33b46b2be86ebbdc843',
        size: 434,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/aff4878917b3591a6656f33b46b2be86ebbdc843',
      },
      {
        path: 'web/src/setupTests.ts',
        mode: '100644',
        type: 'blob',
        sha: '74b1a275a0ea7df518f17bcea5375abf003abe55',
        size: 255,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/74b1a275a0ea7df518f17bcea5375abf003abe55',
      },
      {
        path: 'web/src/utils',
        mode: '040000',
        type: 'tree',
        sha: '96d0762213a7207f9c315cf2e36cb18479eaf565',
        url:
          'https://api.github.com/repos/jmavs21/posts/git/trees/96d0762213a7207f9c315cf2e36cb18479eaf565',
      },
      {
        path: 'web/src/utils/UserContext.ts',
        mode: '100644',
        type: 'blob',
        sha: '0dc3ae45822d4723afcba6e56fbd8a3b715ddca2',
        size: 241,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/0dc3ae45822d4723afcba6e56fbd8a3b715ddca2',
      },
      {
        path: 'web/src/utils/constants.ts',
        mode: '100644',
        type: 'blob',
        sha: '1cfd0dedfdb17463cde80f11e294dc6a2d9c44f2',
        size: 192,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/1cfd0dedfdb17463cde80f11e294dc6a2d9c44f2',
      },
      {
        path: 'web/src/utils/sleep.ts',
        mode: '100644',
        type: 'blob',
        sha: '96160f72358de57c1dfb2550b8bf703f238d2982',
        size: 80,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/96160f72358de57c1dfb2550b8bf703f238d2982',
      },
      {
        path: 'web/tsconfig.json',
        mode: '100644',
        type: 'blob',
        sha: 'af10394b4c375ca68e633961b2227851cd68489d',
        size: 459,
        url:
          'https://api.github.com/repos/jmavs21/posts/git/blobs/af10394b4c375ca68e633961b2227851cd68489d',
      },
    ],
    truncated: false,
  };

  displayEditor(raw.tree);
})();

// javascript: var PRETTYREPOVERSION = '2.0';
// var s = document.createElement('script');
// s.type = 'text/javascript';
// document.body.appendChild(s);
// s.src = '//github.com/jmavs21/pretty-repo/index.js';
// void 0;
