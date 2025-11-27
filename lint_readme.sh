#!/bin/sh
# Linter for README.md format (awesome-list style)
# Note: Markdown syntax is handled by markdownlint-cli2

README="README.md"
errors=0

err() {
    echo "ERROR: $1"
    echo "SUGGESTED FIX: $2"
    errors=$((errors + 1))
}

# Check if README exists
if [ ! -f "$README" ]; then
    echo "ERROR: $README not found"
    exit 1
fi

echo "Linting $README..."
echo ""

# Check for trailing whitespace
if grep -e "\\s$" "$README" > /dev/null 2>&1; then
    err "End-of-line whitespace detected." "Remove spaces at end of lines. Link lines should end in period (.) followed by newline only."
fi

# Extract list items (lines starting with - [)
list_items=$(grep -n "^\\s*- \\[" "$README" 2>/dev/null || true)

if [ -z "$list_items" ]; then
    echo "No list items found to check."
else
    # Use a temporary file to avoid subshell issues
    tmpfile=$(mktemp)
    echo "$list_items" > "$tmpfile"
    
    # Check each list item format
    while IFS= read -r line || [ -n "$line" ]; do
        line_num=$(echo "$line" | cut -d: -f1)
        content=$(echo "$line" | cut -d: -f2-)
        
        # Skip table of contents items (they have anchor links)
        if echo "$content" | grep -q "#"; then
            continue
        fi
        
        # Check format: - [name](url) - description
        if ! echo "$content" | grep -qE "^\\s*- \\[[^]]+\\]\\([^)]+\\) - .+"; then
            err "Line $line_num: List item doesn't match format '- [name](url) - description'" "Ensure format is: - [name](url) - description"
            echo "  Found: $content"
            continue
        fi
        
        # Extract description (everything after " - ")
        description=$(echo "$content" | sed -E 's/^[^-]+- //')
        
        # Skip if description is empty
        if [ -z "$description" ]; then
            err "Line $line_num: List item has no description" "Add a description after the link"
            echo "  Found: $content"
            continue
        fi
        
        # Check if description ends with proper punctuation
        last_char=$(echo "$description" | sed 's/.*\(.\)$/\1/')
        if ! echo "$last_char" | grep -qE '[.!?]'; then
            err "Line $line_num: Description doesn't end with punctuation (. ! ?)" "Add proper punctuation at the end of the description"
            echo "  Found: $description"
        fi
        
        # Check for proper link format
        if ! echo "$content" | grep -qE "\\[[^]]+\\]\\([^)]+\\)"; then
            err "Line $line_num: Link format is incorrect" "Use format [name](url)"
            echo "  Found: $content"
        fi
        
        # Check that there's a space-dash-space separator
        if ! echo "$content" | grep -qE "\\) - "; then
            err "Line $line_num: Missing ' - ' separator between link and description" "Add ' - ' (space-dash-space) between link and description"
            echo "  Found: $content"
        fi
    done < "$tmpfile"
    
    rm -f "$tmpfile"
fi

# Check for duplicates
echo ""
echo "Checking for duplicate entries..."

# Extract all list items with line numbers for duplicate checking
list_items_file=$(mktemp)
grep -n "^\\s*- \\[" "$README" 2>/dev/null | grep -v "#" > "$list_items_file" || true

if [ -s "$list_items_file" ]; then
    # Check for duplicate project names (case-insensitive)
    names_file=$(mktemp)
    while IFS= read -r line || [ -n "$line" ]; do
        line_num=$(echo "$line" | cut -d: -f1)
        content=$(echo "$line" | cut -d: -f2-)
        # Extract project name from [name](url) - match the content between brackets
        name=$(echo "$content" | sed -n 's/.*\[\([^]]*\)\](.*/\1/p' | head -1 | tr '[:upper:]' '[:lower:]')
        if [ -n "$name" ]; then
            echo "$line_num|$name"
        fi
    done < "$list_items_file" > "$names_file"
    
    # Find duplicate names and count errors
    duplicate_names=$(cut -d'|' -f2 "$names_file" | sort | uniq -d)
    if [ -n "$duplicate_names" ]; then
        err "Duplicate project names found" "Remove duplicate entries with the same project name"
        echo "$duplicate_names" | while IFS= read -r dup_name || [ -n "$dup_name" ]; do
            echo "  Project: $dup_name"
            awk -F'|' -v name="$dup_name" '$2 == name {print $1}' "$names_file" | while IFS= read -r line_num || [ -n "$line_num" ]; do
                echo "    Line $line_num"
            done
        done
    fi
    
    # Check for duplicate URLs (only http/https URLs)
    urls_file=$(mktemp)
    while IFS= read -r line || [ -n "$line" ]; do
        line_num=$(echo "$line" | cut -d: -f1)
        content=$(echo "$line" | cut -d: -f2-)
        # Extract URL from [name](url) - only match http:// or https:// URLs
        url=$(echo "$content" | sed -n 's/.*(\(https\?:\/\/[^)]*\)).*/\1/p')
        if [ -n "$url" ]; then
            echo "$line_num|$url"
        fi
    done < "$list_items_file" > "$urls_file"
    
    # Find duplicate URLs and count errors
    duplicate_urls=$(cut -d'|' -f2 "$urls_file" | sort | uniq -d)
    if [ -n "$duplicate_urls" ]; then
        err "Duplicate URLs found" "Remove duplicate entries with the same URL"
        echo "$duplicate_urls" | while IFS= read -r dup_url || [ -n "$dup_url" ]; do
            echo "  URL: $dup_url"
            # Use awk for exact matching instead of grep to avoid escaping issues
            awk -F'|' -v url="$dup_url" '$2 == url {print $1}' "$urls_file" | while IFS= read -r line_num || [ -n "$line_num" ]; do
                echo "    Line $line_num"
            done
        done
    fi
    
    # Check for invalid URLs (localhost, IP addresses, etc.)
    echo ""
    echo "Checking for invalid URLs..."
    invalid_url_errors=0
    
    while IFS= read -r line || [ -n "$line" ]; do
        line_num=$(echo "$line" | cut -d'|' -f1)
        url=$(echo "$line" | cut -d'|' -f2)
        
        # Check for localhost
        if echo "$url" | grep -qiE "://localhost[:/]|://localhost$"; then
            if [ $invalid_url_errors -eq 0 ]; then
                err "Invalid URLs found" "Replace localhost URLs with proper public URLs"
            fi
            invalid_url_errors=$((invalid_url_errors + 1))
            echo "  Line $line_num: localhost URL - $url"
        fi
        
        # Check for 127.0.0.1
        if echo "$url" | grep -qE "://127\\.0\\.0\\.1"; then
            if [ $invalid_url_errors -eq 0 ]; then
                err "Invalid URLs found" "Replace localhost URLs with proper public URLs"
            fi
            invalid_url_errors=$((invalid_url_errors + 1))
            echo "  Line $line_num: loopback IP - $url"
        fi
        
        # Check for private IP ranges (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
        if echo "$url" | grep -qE "://192\\.168\\.[0-9]+\\.[0-9]+|://10\\.[0-9]+\\.[0-9]+\\.[0-9]+|://172\\.(1[6-9]|2[0-9]|3[01])\\.[0-9]+\\.[0-9]+"; then
            if [ $invalid_url_errors -eq 0 ]; then
                err "Invalid URLs found" "Replace private IP addresses with proper public URLs"
            fi
            invalid_url_errors=$((invalid_url_errors + 1))
            echo "  Line $line_num: private IP address - $url"
        fi
        
        # Check for any other IP address (basic check for x.x.x.x pattern)
        if echo "$url" | grep -qE "://[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+"; then
            if [ $invalid_url_errors -eq 0 ]; then
                err "Invalid URLs found" "Replace IP addresses with proper domain URLs"
            fi
            invalid_url_errors=$((invalid_url_errors + 1))
            echo "  Line $line_num: IP address instead of domain - $url"
        fi
        
        # Check for file:// URLs
        if echo "$url" | grep -qiE "^file://"; then
            if [ $invalid_url_errors -eq 0 ]; then
                err "Invalid URLs found" "Replace file:// URLs with proper public URLs"
            fi
            invalid_url_errors=$((invalid_url_errors + 1))
            echo "  Line $line_num: file:// URL - $url"
        fi
        
    done < "$urls_file"
    
    if [ $invalid_url_errors -eq 0 ]; then
        echo "  No invalid URLs found."
    fi
    
    rm -f "$names_file" "$urls_file"
fi

rm -f "$list_items_file"

# Check alphabetical order within sections
echo ""
echo "Checking alphabetical order..."

current_section=""
prev_name=""
section_errors=0

while IFS= read -r line || [ -n "$line" ]; do
    # Check if this is a section header
    if echo "$line" | grep -qE "^##+ "; then
        current_section=$(echo "$line" | sed 's/^##* //')
        prev_name=""
        continue
    fi
    
    # Check if this is a list item (but not TOC)
    if echo "$line" | grep -qE "^- \\[" && ! echo "$line" | grep -q "#"; then
        # Extract project name (case-insensitive for comparison)
        name=$(echo "$line" | sed -n 's/^- \[\([^]]*\)\].*/\1/p' | tr '[:upper:]' '[:lower:]')
        
        if [ -n "$name" ] && [ -n "$prev_name" ]; then
            # Compare with previous name
            if [ "$(printf '%s\n%s' "$prev_name" "$name" | sort | head -1)" != "$prev_name" ]; then
                if [ $section_errors -eq 0 ]; then
                    err "Entries not in alphabetical order" "Sort entries alphabetically within each section"
                fi
                section_errors=$((section_errors + 1))
                echo "  Section '$current_section': '$prev_name' should come after '$(echo "$line" | sed -n 's/^- \[\([^]]*\)\].*/\1/p')'"
            fi
        fi
        
        prev_name="$name"
    fi
done < "$README"

if [ $section_errors -eq 0 ]; then
    echo "  All sections are alphabetically sorted."
fi

# Summary
echo ""
if [ $errors -eq 0 ]; then
    echo "✓ All format checks passed!"
    exit 0
else
    echo "✗ Found $errors error(s)"
    exit 1
fi

