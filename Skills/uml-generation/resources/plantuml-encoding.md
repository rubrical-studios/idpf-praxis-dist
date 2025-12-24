# PlantUML URL Encoding
**Version:** v0.15.0

Reference for encoding PlantUML diagrams into URLs for online rendering.

---

## Overview

PlantUML's online server accepts encoded diagram text via URL:

```
http://www.plantuml.com/plantuml/{format}/{encoded}
```

**Formats:**
- `svg` - Scalable Vector Graphics (recommended)
- `png` - Portable Network Graphics
- `txt` - ASCII art (sequence diagrams only)
- `pdf` - PDF document

---

## Encoding Algorithm

### Step 1: UTF-8 Encode

Convert the PlantUML source text to UTF-8 bytes.

```
@startuml
A -> B
@enduml
```

### Step 2: Deflate Compress

Apply DEFLATE compression (zlib without header).

### Step 3: Base64-like Encode

Use PlantUML's custom 64-character alphabet:

```
0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_
```

**Note:** This differs from standard Base64 which uses `+/` instead of `-_`.

### Step 4: Construct URL

```
http://www.plantuml.com/plantuml/svg/{encoded_string}
```

---

## Encoding Implementation

### JavaScript (Node.js)

```javascript
const zlib = require('zlib');

function encode64(data) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  let result = '';

  for (let i = 0; i < data.length; i += 3) {
    const b1 = data[i] & 0xFF;
    const b2 = i + 1 < data.length ? data[i + 1] & 0xFF : 0;
    const b3 = i + 2 < data.length ? data[i + 2] & 0xFF : 0;

    result += alphabet.charAt(b1 >> 2);
    result += alphabet.charAt(((b1 & 0x3) << 4) | (b2 >> 4));
    result += alphabet.charAt(((b2 & 0xF) << 2) | (b3 >> 6));
    result += alphabet.charAt(b3 & 0x3F);
  }

  return result;
}

function encodePlantUML(source) {
  const utf8 = Buffer.from(source, 'utf8');
  const deflated = zlib.deflateRawSync(utf8, { level: 9 });
  return encode64(deflated);
}

// Usage
const source = `@startuml
A -> B: Hello
@enduml`;

const encoded = encodePlantUML(source);
const url = `http://www.plantuml.com/plantuml/svg/${encoded}`;
console.log(url);
```

### Python

```python
import zlib

def encode64(data):
    alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'
    result = []

    for i in range(0, len(data), 3):
        b1 = data[i] if i < len(data) else 0
        b2 = data[i + 1] if i + 1 < len(data) else 0
        b3 = data[i + 2] if i + 2 < len(data) else 0

        result.append(alphabet[b1 >> 2])
        result.append(alphabet[((b1 & 0x3) << 4) | (b2 >> 4)])
        result.append(alphabet[((b2 & 0xF) << 2) | (b3 >> 6)])
        result.append(alphabet[b3 & 0x3F])

    return ''.join(result)

def encode_plantuml(source):
    utf8 = source.encode('utf-8')
    compressed = zlib.compress(utf8, 9)[2:-4]  # Remove zlib header/trailer
    return encode64(compressed)

# Usage
source = """@startuml
A -> B: Hello
@enduml"""

encoded = encode_plantuml(source)
url = f"http://www.plantuml.com/plantuml/svg/{encoded}"
print(url)
```

---

## Alternative: HEX Encoding

For simpler encoding (but longer URLs), use HEX format:

```
http://www.plantuml.com/plantuml/svg/~h{hex_string}
```

### Implementation

```python
def encode_hex(source):
    utf8 = source.encode('utf-8')
    return ''.join(f'{b:02x}' for b in utf8)

# Usage
source = "@startuml\nA -> B\n@enduml"
encoded = encode_hex(source)
url = f"http://www.plantuml.com/plantuml/svg/~h{encoded}"
```

**Note:** HEX encoding produces much longer URLs but requires no compression.

---

## URL Length Limits

| Browser/Context | Limit |
|-----------------|-------|
| Most browsers | ~2000 characters |
| IE/Edge legacy | ~2083 characters |
| Apache default | 8190 characters |
| Nginx default | 4096 characters |

**Recommendation:** Keep URLs under 2000 characters for maximum compatibility.

### Handling Large Diagrams

When encoded URL exceeds ~2000 characters:

1. **Output source only** with instructions:
   ```
   Diagram too large for URL encoding.
   Copy the PlantUML source to:
   - https://www.planttext.com/
   - VS Code with PlantUML extension
   - Local PlantUML installation
   ```

2. **Split into multiple diagrams** by:
   - Package/module
   - Feature area
   - Layer (presentation, business, data)

3. **Simplify the diagram:**
   - Hide private members: `hide private members`
   - Hide empty sections: `hide empty members`
   - Focus on key relationships only

---

## URL Format Examples

### SVG (Recommended)

```
http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80
```

### PNG

```
http://www.plantuml.com/plantuml/png/SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80
```

### ASCII Art (Sequence Only)

```
http://www.plantuml.com/plantuml/txt/SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80
```

---

## Public Server Information

**Server:** `www.plantuml.com`

**Rate Limits:** Not officially documented, but high-volume automated use may be throttled.

**Privacy:** Diagrams are not stored, but diagram text is sent to PlantUML servers.

**Alternatives:**
- Self-hosted PlantUML server (Phase 2)
- Local JAR execution (Phase 2)
- Docker container (Phase 2)

---

## NPM Package

For JavaScript projects, use the official encoder:

```bash
npm install plantuml-encoder
```

```javascript
const plantumlEncoder = require('plantuml-encoder');

const encoded = plantumlEncoder.encode('@startuml\nA -> B\n@enduml');
const url = `http://www.plantuml.com/plantuml/svg/${encoded}`;
```

---

## Decoding (Reference)

To decode an existing PlantUML URL:

```javascript
const plantumlEncoder = require('plantuml-encoder');

const encoded = 'SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80';
const source = plantumlEncoder.decode(encoded);
console.log(source);
```

---

**End of PlantUML Encoding Guide**
