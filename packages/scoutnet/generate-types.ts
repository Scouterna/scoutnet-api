import fs from "node:fs";
import openapiTS, { astToString, UNKNOWN, NULL } from "openapi-typescript";
import ts from "typescript";

const schemaFile = import.meta.resolve(
  "@scouterna/scoutnet-openapi/schema/scoutnet.yaml",
);

const outputFile = new URL("./src/generated/api-types.ts", import.meta.url);

function isPropertyOptional(node: ts.PropertySignature): boolean {
  return node.questionToken !== undefined;
}

const ast = await openapiTS(schemaFile, {
  transform(schemaObject, options) {
    // Make schema objects that are empty objects (`{}`) unknown
    const isEmptyObject =
      typeof schemaObject.type === "object" &&
      JSON.stringify(schemaObject.type) === "{}";

    if (isEmptyObject) {
      return UNKNOWN;
    }
  },
  postTransform(type, options) {
    if (ts.isTypeLiteralNode(type)) {
      const updatedMembers = type.members.map((member) => {
        // Add null to optional properties
        if (ts.isPropertySignature(member) && isPropertyOptional(member)) {
          const originalType = member.type;
          if (originalType) {
            const unionType = ts.factory.createUnionTypeNode([
              originalType,
              NULL,
            ]);
            return ts.factory.updatePropertySignature(
              member,
              member.modifiers,
              member.name,
              member.questionToken,
              unionType,
            );
          }
        }
        return member;
      });
      return ts.factory.createTypeLiteralNode(updatedMembers);
    }
    return type;
  },
});
const contents = astToString(ast);

fs.writeFileSync(outputFile, contents);
