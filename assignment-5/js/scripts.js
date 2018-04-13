(function(){
  var data = [
    {
      name: 'emmet',
      description: 'Emmet is the number one code snippet tool used by front end developers. Emmet helps to create HTML and CSS faster with the use of snippets. It uses abbreviations that expand to valid HTML tags.',
      author: 'emmitio',
      url: 'https://atom.io/packages/emmet',
      downloads: 1688987,
      stars: 2554,
      selector: 'p1'
    },
    {
      name: 'atom-beautify',
      description: 'The atom-beautify package will clean up your code, and make it more readable. It has support for a variety of programming languages, including HTML, CSS, JavaScript, PHP, Python, Ruby, Java, C, C++, C#, Objective-C, CoffeeScript, and more. It will only beautify selected text if a selection is found, otherwise the beautify command ^ + ⌥ + b, or typing “Beautify” from the Command Palette will beautify the whole file.',
      author: 'Glavin001',
      url: 'https://atom.io/packages/atom-beautify',
      downloads: 4228040,
      stars: 4541,
      selector: 'p2'
    },
    {
      name: 'Ask Stack',
      description: 'Hate switching between your browser and the editor? The Ask Stack Overflow package allows you to quickly search Stack Overflow and get code samples directly in the Atom editor. To use, simply type ctrl + alt + a or type “Ask Stack” in the Command Palette.',
      author: 'Chris911',
      url: 'https://atom.io/packages/ask-stack',
      downloads: 48875,
      stars: 262,
      selector: 'p3'
    },
    {
      name: 'git-blame',
      description: 'The git-blame package allows you to toggle git-blame annotations in the gutter of the Atom editor. To toggle the git-blame annotations you can use ctrl + b or right-click anywhere on your file, and select Toggle Git Blame. Just make sure your cursor is in the file you want to git-blame, otherwise this keyboard shortcut will collapse folders in the tree-view sidebar.',
      author: 'alexcorre',
      url: 'https://atom.io/packages/git-blame',
      downloads: 165729,
      stars: 387,
      selector: 'p4'
    },
    {
      name: 'Git-Plus',
      description: 'The Git-Plus package provides a bunch of shortcuts to commonly used git actions, without the need to switch to terminal. You can bring up the git-plus commands by typing cmd + shift + h or ctrl + shift + h.',
      author: 'akonwi',
      url: 'https://atom.io/packages/git-plus',
      downloads: 1893150,
      stars: 2456,
      selector: 'p5'
    },
    {
      name: 'git-time-machine',
      description: 'It shows you a visual plot of commits in your current file, over time. You can click on the timeplot, or hover over it and see all of the commits for a specific time range. You can also view the git-diff between the current version and the previous version, once a selection is made.',
      author: 'littlebee',
      url: 'https://atom.io/packages/git-time-machine',
      downloads: 292549,
      stars: 956,
      selector: 'p6'
    },
    {
      name: 'Linter',
      description: 'The Linter package is a base linter package that relies on sub-packages for specific languages. You can find a list of language-specific linters at atomlinter.github.io.',
      author: 'steelbrain',
      url: 'https://atom.io/packages/linter',
      downloads: 4450278,
      stars: 4153,
      selector: 'p7'
    },
    {
      name: 'language-liquid',
      description: 'The language-liquid package is one I can’t live without when theming for Shopify. For the most part, Atom is pretty good with out-of-the-box syntax highlighting, but it doesn’t have syntax highlighting for Liquid. This is also a great package to use if you’re using Jekyll for templating static sites or blogs.',
      author: 'puranjayjain',
      url: 'https://atom.io/packages/language-liquid',
      downloads: 32826,
      stars: 77,
      selector: 'p8'
    },
    {
      name: 'Project Manager',
      description: 'The Project Manager package provides quick and easy access for switching between projects in Atom. Save a project by typing “Project Manager: Save Project” into the Command Palette. Once saved, type ctrl-cmd-p (on a Mac) or alt-shift-p (on a PC) to activate a list of saved projects with the Project Manager package. Projects can be filtered by title, group, or template.',
      author: 'danielbrodin',
      url: 'https://atom.io/packages/project-manager',
      downloads: 791845,
      stars: 2087,
      selector: 'p9'
    },
    {
      name: 'Highlight Selected',
      description: 'The Highlight Selected package is super simple, it highlights the current word selected on double click. Especially useful if you’re looking for a particular method name or function within a file without having to open the find panel.',
      author: 'richrace',
      url: 'https://atom.io/packages/highlight-selected',
      downloads: 1057605,
      stars: 2756,
      selector: 'p10'
    }
  ];

  function Package(data) {
      this.name = data.name;
      this.description = data.description;
      this.author = data.author;
      this.url = data.url;
      this.downloads = data.downloads;
      this.stars = data.stars;
      this.selector = data.selector;

      this.getFormattedDownloads = function () {
        return this.downloads.toLocaleString();
      }

      this.getFormattedStars = function () {
        return this.stars.toLocaleString();
      }
    }

    var getEl = function (id) {
      return document.getElementById(id);
    };

    var writePackageInfo = function (package, selector){
      var nameEl = getEl(selector + '-name'),
        descEl = getEl(selector + '-description'),
        authorEl = getEl(selector + '-author'),
        urlEl = getEl(selector + '-url'),
        downloadsEl = getEl(selector + '-downloads'),
        starsEl = getEl(selector + '-stars');

      nameEl.textContent = package.name;
      descEl.textContent = package.description;
      authorEl.textContent = package.author;
      urlEl.href = package.url;
      downloadsEl.textContent = package.downloads;
      starsEl.textContent = package.stars;
    };

  // date
  var today = new Date();
  var dateEl = document.getElementById('date');
  dateEl.textContent = today.toDateString();

  // load packages and write info to page
  for (var i = 0; i < data.length; i++){
    var package = new Package(data[i]);
    writePackageInfo(package, package.selector)
  }

}());
