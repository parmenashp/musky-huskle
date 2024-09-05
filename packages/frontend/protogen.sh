#!/bin/bash
echo "Compiling protobuf definitions"
# protoc -I=. api/proto/members.proto \
#   --js_out=import_style=commonjs,binary:. \
#   --grpc-web_out=import_style=typescript,mode=grpcweb:.

npx protoc --ts_out . --proto_path . api/proto/members.proto
