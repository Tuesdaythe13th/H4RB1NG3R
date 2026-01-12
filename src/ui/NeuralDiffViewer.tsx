import React from "react";

type NeuralDiffViewerProps = {
  runId: string;
  layerRange: string;
  notes?: string;
};

export function NeuralDiffViewer({ runId, layerRange, notes }: NeuralDiffViewerProps) {
  return (
    <section aria-label="Neural Diff Viewer">
      <h2>Neural Diff Viewer</h2>
      <p>Run: {runId}</p>
      <p>Layers: {layerRange}</p>
      {notes ? <p>Notes: {notes}</p> : null}
    </section>
  );
}
