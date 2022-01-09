### Compiling your contracts

Compiling contracts can be done using the command `polar compile`.

#### Compile all contracts

`polar compile` by default compiles all the contracts in the `contracts/` directory. For each contract compiled, corresponding `.wasm` file is stored in the `artifacts/contracts` directory created in project's root directory.

#### Compile one contract

To compile only one contract or a subset of all contracts in the `contract/` directory, use command `polar compile <sourcePaths>` and this can look something like `polar compile contracts/sample-project` or `polar compile contracts/sample-project-1 contracts/sample-project-2`.

#### Schema generation

Schema is also generated alongside the compiled `.wasm` file for each of the contract compiled using `polar compile` command. Schema files are `.json` files (stored inside `artifacts/schema/`) directory and there are multiple `.json` files per contract but only one `.wasm` compiled file per contract. To skip schema generation while compiling use `polar compile --skip-schema`.

Single contract `artifacts/` directory structure:

```bash
.
├── contracts
│   └── sample_project.wasm
└── schema
    └── sample_project
        ├── count_response.json
        ├── handle_msg.json
        ├── init_msg.json
        ├── query_msg.json
        └── state.json

3 directories, 6 files
```

Multi contract `artifacts/` directory structure:

```bash
.
├── contracts
|   ├── sample_project_1.wasm
│   └── sample_project_2.wasm
└── schema
    ├── sample_project
    │   ├── count_response.json
    │   ├── handle_msg.json
    │   ├── init_msg.json
    │   ├── query_msg.json
    │   └── state.json
    └── sample_project_1
        ├── count_response.json
        ├── handle_msg.json
        ├── init_msg.json
        ├── query_msg.json
        └── state.json

4 directories, 12 files
```