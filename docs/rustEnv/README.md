# Setup Rust Environment 

## Installing using polar

Use command `polar setup` to install the Rust environment using just one command.

```bash
$ polar setup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /home/uditgulati/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory located at:

  /home/uditgulati/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /home/uditgulati/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /home/uditgulati/.profile
  /home/uditgulati/.bashrc

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: x86_64-unknown-linux-gnu
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes
...
```

## Installing manually

**Linux**

+ Install `rustup`.

```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ export PATH="${HOME}/.cargo/bin:${PATH}"
```

+ Add `wasm32-unknown-unknown` target to `rustup stable` version.

```bash
$ rustup default stable
$ rustup target list --installed
$ rustup target add wasm32-unknown-unknown
```

+ Install `nightly` toolchain. Add `wasm32-unknown-unknown` target to `rustup nightly` version.

```bash
$ rustup install nightly
$ rustup target add wasm32-unknown-unknown --toolchain nightly
```

+ Install `build-essentials`.

```bash
$ sudo apt install build-essential
```


