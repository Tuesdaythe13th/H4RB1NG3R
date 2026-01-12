"""EXIF removal utilities."""

from __future__ import annotations


def strip_metadata(blob: bytes) -> bytes:
    """Remove common metadata segments from JPEG blobs.

    Only strips JPEG APP1 (EXIF/XMP) and APP13 (Photoshop) segments. Other formats
    are returned untouched.
    """
    if not blob or len(blob) < 4:
        return blob

    if not blob.startswith(b"\xff\xd8"):
        return blob

    output = bytearray(blob[:2])
    pos = 2
    length = len(blob)

    while pos + 4 <= length:
        if blob[pos] != 0xFF:
            break

        marker = blob[pos + 1]

        if marker == 0xDA:  # Start of Scan
            output.extend(blob[pos:])
            return bytes(output)
        if marker == 0xD9:  # End of Image
            output.extend(blob[pos:pos + 2])
            return bytes(output)

        seg_len = int.from_bytes(blob[pos + 2:pos + 4], "big")
        seg_end = pos + 2 + seg_len
        segment = blob[pos:seg_end]

        if marker not in (0xE1, 0xED):
            output.extend(segment)

        pos = seg_end

    return bytes(output)
