// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

use ninja_gen::{
    archives::{download_and_extract, with_exe},
    glob, hashmap, inputs,
    protobuf::{protoc_archive, ClangFormat},
    Build, Result, Utf8Path
};

pub fn download_protoc(build: &mut Build) -> Result<()> {
    let protoc_binary = match std::env::var("PROTOC_BINARY") {
        Ok(path) => {
            assert!(
                Utf8Path::new(&path).is_absolute(),
                "PROTOC_BINARY must be absolute"
            );
            path.into()
        }
        Err(_) => {
            download_and_extract(
                build,
                "protoc",
                protoc_archive(build.host_platform),
                hashmap! {
                    "bin" => [with_exe("bin/protoc")]
                },
            )?;
            inputs![":extract:protoc:bin"]
        }
    };
    let protoc_binary = build.expand_inputs(protoc_binary);
    build.variable("protoc_binary", &protoc_binary[0]);
    Ok(())
}

pub fn check_proto(build: &mut Build) -> Result<()> {
    build.add(
        "check:format:proto",
        ClangFormat {
            inputs: inputs![glob!["proto/**/*.proto"]],
            check_only: true,
        },
    )?;
    build.add(
        "format:proto",
        ClangFormat {
            inputs: inputs![glob!["proto/**/*.proto"]],
            check_only: false,
        },
    )?;
    Ok(())
}
