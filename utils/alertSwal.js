import Swal from 'sweetalert2';

export function successAlert() {
    return Swal.fire({
        position: "top-end",
        title: '<p style="font-size: 20px; color: #56d170; margin-bottom: 0px; margin-top: 1px">' +
            "<i class='typcn typcn-info-large'></i> success</p>",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'small-popup-class',
        },
        width: '300px',
        heightAuto: false,
    });
}

export function failedAlert() {
    return Swal.fire({
        position: "top-end",
        title: '<p style="font-size: 20px; color: #c24f4f; margin-bottom: 0px; margin-top: 1px">' +
            "<i class='typcn typcn-info-large'></i> failed</p>",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'small-popup-class',
        },
        width: '300px',
        heightAuto: false,
    });
}
