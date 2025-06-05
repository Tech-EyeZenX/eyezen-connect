export function getInitials(fullName) {
    if (!fullName || typeof fullName !== 'string') {
        return '';
    }

    const name = fullName.trim().split(' ');
    let intial = name[0].charAt(0).toUpperCase();
    if (name.length > 1) {
        intial += name[name.length - 1].charAt(0).toUpperCase();
    }
    return intial;
}