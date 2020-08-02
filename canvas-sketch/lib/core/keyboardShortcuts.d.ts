export declare interface KeyboardShortcutActions {
  enabled: () => boolean;
  save: (ev: KeyboardEvent) => void;
  togglePlay: (ev: KeyboardEvent) => void;
  commit: (ev: KeyboardEvent) => void;
}

export declare interface ManageKeyboardShortcuts {
  attach: () => void;
  detach: () => void;
}

declare function keyboardShortcuts(
  opt?: KeyboardShortcutActions
): ManageKeyboardShortcuts;

export default keyboardShortcuts;
