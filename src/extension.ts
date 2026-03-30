import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

    const executionData = new Map<vscode.TerminalShellExecution, string>();

    const startDisposable = vscode.window.onDidStartTerminalShellExecution(async (event) => {
        try {
            const stream = event.execution.read();
            let data = '';

            for await (const chunk of stream) {
                data += chunk;
            }

            executionData.set(event.execution, data);

        } catch (error) {
            console.error("Error reading terminal execution data:", error);
        }
    });

    const endDisposable = vscode.window.onDidEndTerminalShellExecution((event) => {

        const data = executionData.get(event.execution) || '';
        const exitCode = event.exitCode;

        // console.log("Exit code:", exitCode);
        // console.log("Command output:", data);

        let isError = false;

        if (exitCode !== undefined && exitCode !== 0) {
            isError = true;
        }

        else if (exitCode === undefined) {
            const errorRegex = /(error:|exception|traceback)/i;
            if (errorRegex.test(data)) {
                isError = true;
            }
        }

        if (isError) {
            const soundPath = path.join(
                context.extensionPath,
                'media',
                'faahh.wav'
            );

            // // console.log("Playing sound from:", soundPath);
            playSound(soundPath);
        }

        executionData.delete(event.execution);
    });

    // Command to change sound
    const changeSoundDisposable = vscode.commands.registerCommand(
        'error-sound-alert.changeSound',
        async () => {
            const fileUri = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    'WAV files': ['wav']
                },
                openLabel: 'Select WAV File'
            });

            if (fileUri && fileUri[0]) {
                const selectedFile = fileUri[0].fsPath;
                const targetPath = path.join(context.extensionPath, 'media', 'faahh.wav');

                try {
                    await fs.promises.copyFile(selectedFile, targetPath);
                    vscode.window.showInformationMessage('Error sound changed successfully!');
                } catch (error) {
                    vscode.window.showErrorMessage(
                        'Failed to change sound file: ' + (error as Error).message
                    );
                }
            }
        }
    );

    context.subscriptions.push(changeSoundDisposable, startDisposable, endDisposable);
}

function playSound(file: string) {

    const platform = process.platform;

    if (platform === "win32") {
        exec(`powershell -c (New-Object System.Media.SoundPlayer '${file}').PlaySync();`);
    } else if (platform === "darwin") {
        exec(`afplay "${file}"`);
    } else {
        exec(`aplay "${file}"`);
    }
}

export function deactivate() {}