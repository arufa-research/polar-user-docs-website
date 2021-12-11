module.exports = {
    title: 'Arufa-Research/Polar',
    description: 'Documentation',
    themeConfig: {
        overrideTheme: 'dark',
        displayAllHeaders: true,
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Documentation', link: '/getting-started/'},
            {text: 'Videos', link: 'https://www.youtube.com/watch?v=amAlwxCEgnI'},
        ],
        lastUpdated: true,
        repo: "arufa-research/polar-user-docs-website",
        docsDir: "docs",
        docsBranch: "master",
        editLinkText: "Help us improve this page!",
        editLinks: true,
        sidebarDepth: 1,
        displayAllHeaders: true,
        // sidebar: 'auto'
        sidebar: {
            "/": [
                ["/getting-started/", "Getting Started", 1],
                {
                    title: "Guides",
                    url: "/guides/",
                    collapsable: false,
                    depth: 1,
                    children: [
                      ["/guides/project.md", "Setting up a project", 0],
                      ["/guides/compiling-contracts.md", "Compiling your contracts", 0],
                      ["/guides/writing-scripts.md", "Writing Scripts", 0],
                      ["/guides/testing.md", "Testing Contracts", 0],
                      ["/guides/using-localenet.md", "Using localnet with polar", 0],
                    ],
                  },
            ]
        }
    }
}
