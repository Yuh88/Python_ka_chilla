import re

with open('d:/Python_ka_chilla/script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace getTarjamaSyllabus and getTarjamaSurahById functions
text = re.sub(
    r'\s*const getTarjamaSyllabus = \(\) => \{.+?\};\n',
    '',
    text,
    flags=re.DOTALL
)

text = re.sub(
    r'\s*const getTarjamaSurahById = \(.*?\) => \{.+?\};\n',
    '',
    text,
    flags=re.DOTALL
)

text = re.sub(
    r'\s*if \(subjectName === \'Tarjama-tul-Quran\' &&\s+getTarjamaSyllabus\(\)\.length\) \{.+?label\n\s*};\n\s*}\n',
    '',
    text,
    flags=re.DOTALL
)

# In formatChapterLabelFromPath
text = re.sub(
    r'\s*if \(subjectName === \'Tarjama-tul-Quran\' &&\n\s*getTarjamaSyllabus\(\)\.length\) \{\n\s*// Keep route slugs ASCII-safe for Tarjama surah IDs\.\n\s*return pathSegments\.map\(\(segment\) => String\(segment\)\)\.join\(\'-\'\);\n\s*\}\n',
    '',
    text,
    flags=re.DOTALL
)

# In getChapterEntries
text = re.sub(
    r'\s*if \(subjectName === \'Tarjama-tul-Quran\'.*?&& \n?\s*getTarjamaSyllabus\(\)\.length\) \{.*?\}\n\s*\}\n',
    '',
    text,
    flags=re.DOTALL
)

text = re.sub(
    r'\s*if \(subjectName === \'Tarjama-tul-Quran\' && getTarjamaSyllabus\(\)\.length\) \{\n\s*return \[\];\n\s*\}\n',
    '',
    text,
    flags=re.DOTALL
)

# Let's save it
with open('d:/Python_ka_chilla/script.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replaced script.js")
