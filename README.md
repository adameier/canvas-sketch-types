Type definitions for [`canvas-sketch`](https://github.com/mattdesl/canvas-sketch).

To use, `npm install canvas-sketch-types` and add the following to your tsconfig.json:

```json
{
  ...
  "compilerOptions": {
    ...
		"paths": {
      ...
      "canvas-sketch": ["types/canvas-sketch"],
      "canvas-sketch/*": ["types/canvas-sketch/*"]
    },
  },
  ...
}
```

might add to DefinitelyTyped in the future