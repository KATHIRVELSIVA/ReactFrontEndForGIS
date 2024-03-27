// import './css/checkHome.css';
export function CheckHome() {
    return (
        <>
            <ol class="breadcrumb">
                <li class="breadcrumb-item success" aria-current="page">Dashboard</li>
            </ol>

            <div class="row">
                <div class="col-md-3">
                    <a class="router-link" routerLink="/beneficiary">
                        <mat-card class="mat-elevation-z8 beneficiary-card">
                            <mat-card-header>
                                <mat-card-title class="card-title">Beneficiaries</mat-card-title>
                            </mat-card-header>

                            <mat-card-content>
                                <mat-icon class="card-icon" mat-icon-label>group</mat-icon>
                            </mat-card-content>
                            <mat-card-actions>
                                <a class="router-link" routerLink="/beneficiary">
                                    <button mat-button class="action-button">View</button></a
                                >
                            </mat-card-actions>
                        </mat-card>
                    </a>
                </div>
                <div class="col-md-3">
                    <a class="router-link" routerLink="/clients">
                        <mat-card class="mat-elevation-z8 client-card">
                            <mat-card-header>
                                <mat-card-title class="card-title">Clients</mat-card-title>
                            </mat-card-header>
                            <mat-card-content>
                                <mat-icon class="card-icon" mat-icon-label>person</mat-icon>
                            </mat-card-content>
                            <mat-card-actions>
                                <a class="router-link" routerLink="/clients">
                                    <button mat-button class="action-button">View</button></a
                                >
                            </mat-card-actions>
                        </mat-card>
                    </a>
                </div>
                <div class="col-md-3">
                    <a class="router-link" routerLink="/policies">
                        <mat-card class="mat-elevation-z8 policy-card">
                            <mat-card-header>
                                <mat-card-title class="card-title">Policies</mat-card-title>
                            </mat-card-header>
                            <mat-card-content>
                                <mat-icon class="card-icon" mat-icon-label>assignment</mat-icon>
                            </mat-card-content>
                            <mat-card-actions>
                                <a class="router-link" routerLink="/policies">
                                    <button mat-button class="action-button">View</button></a
                                >
                            </mat-card-actions>
                        </mat-card>
                    </a>
                </div>
                <div class="col-md-3">
                    <a class="router-link" routerLink="/products">
                        <mat-card class="mat-elevation-z8 product-card">
                            <mat-card-header>
                                <mat-card-title class="card-title">Products</mat-card-title>
                            </mat-card-header>
                            <mat-card-content>
                                <mat-icon class="card-icon">local_offer</mat-icon>
                            </mat-card-content>
                            <mat-card-actions>
                                <a class="router-link" routerLink="/products">
                                    <button mat-button class="action-button">View</button></a
                                >
                            </mat-card-actions>
                        </mat-card>
                    </a>
                </div>
            </div>
        </>
    );
}